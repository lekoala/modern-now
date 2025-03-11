import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import {
    setAttr,
    hasNotAttrString,
    setRemoveAttr,
    getBoolData,
    hasNotClassString,
    toggleClass,
} from "./utils/attrs.js";
import { clearInputs, globalContext } from "./utils/misc.js";
import { byId, qs, qsa } from "./utils/query.js";

/**
 * @param {HTMLElement} el
 * @param {String} customClass
 * @returns {String}
 */
function isExpanded(el, customClass = null) {
    if (customClass !== null) {
        return hasNotClassString(el, customClass);
    }
    return hasNotAttrString(el, "hidden");
}

const { HTML } = createRegistry(globalContext());
define(
    "input[type='checkbox'][data-toggle]",
    class extends HTML.Input {
        get el() {
            return byId(this.dataset.toggle);
        }

        connectedCallback() {
            on("change", this);
            const el = this.el;
            this.ariaExpanded = isExpanded(el, this.dataset.toggleClass);
            setAttr(this, "aria-controls", this.dataset.toggle);
            this.update();
        }

        disconnectedCallback() {
            off("change", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $change(ev) {
            const el = this.el;

            if (this.dataset.toggleClass) {
                toggleClass(el, this.dataset.toggleClass);
            } else {
                // make sure to have something like [hidden] { display: none !important}
                // https://meowni.ca/hidden.is.a.lie.html
                setRemoveAttr(el, "hidden", !this.checked);
            }

            this.update();

            // If not checked, we might want to clear values
            if (!this.checked && getBoolData(this, "toggleClear")) {
                clearInputs(qsa("input,textarea,select", null, this.el));
            }
        }

        update() {
            const el = this.el;
            this.ariaExpanded = isExpanded(el, this.dataset.toggleClass);
        }
    },
);
