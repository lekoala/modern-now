import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { setAttr, hasNotAttrString, toggleAttr, hasAttr, removeAttr, hasNotClassString } from "./utils/attrs.js";
import { doWithAnimation, globalContext, templateAsData } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";

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

const events = ["click", "toggleClose"];
const { HTML } = createRegistry(globalContext());
define(
    "button[data-toggle]",
    class extends HTML.Button {
        get el() {
            return byId(this.dataset.toggle);
        }

        connectedCallback() {
            on(events, this);
            const el = this.el;
            const d = this.dataset;
            this.ariaExpanded = isExpanded(el);
            setAttr(this, "aria-controls", d.toggle);

            // Content can be really annoying to put in a data attr, so we support template as well
            templateAsData(this, ["hidden", "visible"], "toggle");

            // keep track of original value
            d.toggleOriginal = this.innerHTML.trim();

            // Update aria expanded state
            this.update();
        }

        disconnectedCallback() {
            off(events, this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $toggleClose() {
            const el = this.el;
            setAttr(el, "hidden");
            this.update("false");
        }

        /**
         * @param {MouseEvent} ev
         */
        $click(ev) {
            const el = this.el;
            const d = this.dataset;

            if (d.toggleGroup) {
                // It's already opened, return
                if (this.ariaExpanded === "true") {
                    return;
                }

                // Close others
                const others = qsa(`[data-toggle-group="${d.toggleGroup}"]`);
                for (const other of others) {
                    if (other === this) {
                        continue;
                    }
                    other.ariaCurrent = "false";
                    dispatch("toggleClose", other);
                }
            }

            const open = this.ariaExpanded === "false";
            if (open) {
                doWithAnimation(el, null, true);
                // make sure to have something like [hidden] { display: none !important}
                // https://meowni.ca/hidden.is.a.lie.html
                toggleAttr(el, "hidden");
            } else {
                doWithAnimation(el, () => {
                    toggleAttr(el, "hidden");
                });
            }
            this.update(open ? "true" : "false");
        }

        /**
         * @param {String} state true|false
         */
        update(state = null) {
            const el = this.el;
            const d = this.dataset;

            this.ariaExpanded = state || isExpanded(el);
            if (d.toggleGroup) {
                this.ariaSelected = this.ariaExpanded;
            }

            if (d.toggleVisible || d.toggleHidden) {
                if (this.ariaExpanded === "true") {
                    this.innerHTML = d.toggleVisible || d.toggleOriginal;
                } else {
                    this.innerHTML = d.toggleHidden || d.toggleOriginal;
                }
            }
        }
    },
);
