import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import { setAttr, hasNotAttrString, toggleAttr } from "./utils/attrs.js";
import { templateAsData } from "./utils/misc.js";
import { byId } from "./utils/query.js";

const { HTML } = createRegistry();

define(
    "button[data-toggle]",
    class extends HTML.Button {
        get el() {
            return byId(this.dataset.toggle);
        }

        connectedCallback() {
            on("click", this);
            const el = this.el;
            this.ariaExpanded = hasNotAttrString(el, "hidden");
            setAttr(this, "aria-controls", this.dataset.toggle);

            templateAsData(this, ["hidden", "visible"], "toggle");

            // keep track of original value
            this.dataset.toggleOriginal = this.innerHTML;

            this.update();
        }

        disconnectedCallback() {
            off("click", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        /**
         * @param {MouseEvent} ev
         */
        $click(ev) {
            const el = this.el;

            // make sure to have something like [hidden] { display: none !important}
            // https://meowni.ca/hidden.is.a.lie.html
            toggleAttr(el, "hidden");
            this.update();
        }

        update() {
            const el = this.el;
            this.ariaExpanded = hasNotAttrString(el, "hidden");
            if (this.ariaExpanded === "true") {
                this.innerHTML = this.dataset.toggleVisible || this.dataset.toggleOriginal;
            } else {
                this.innerHTML = this.dataset.toggleHidden || this.dataset.toggleOriginal;
            }
        }
    },
);
