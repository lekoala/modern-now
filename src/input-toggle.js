import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import { setAttr, hasNotAttrString, toggleAttr, setRemoveAttr, getBoolData } from "./utils/attrs.js";
import { clearInputs, globalContext, templateAsData } from "./utils/misc.js";
import { byId, qs, qsa } from "./utils/query.js";

const { HTML } = createRegistry(globalContext());
define(
    "input[data-toggle]",
    class extends HTML.Input {
        get el() {
            return byId(this.dataset.toggle);
        }

        connectedCallback() {
            on("change", this);
            const el = this.el;
            this.ariaExpanded = hasNotAttrString(el, "hidden");
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

            // make sure to have something like [hidden] { display: none !important}
            // https://meowni.ca/hidden.is.a.lie.html
            setRemoveAttr(el, "hidden", !this.checked);
            this.update();
            if (!this.checked && getBoolData(this, "toggleClear")) {
                clearInputs(qsa("input,textarea,select", null, this.el));
            }
        }

        update() {
            const el = this.el;
            this.ariaExpanded = hasNotAttrString(el, "hidden");
        }
    },
);
