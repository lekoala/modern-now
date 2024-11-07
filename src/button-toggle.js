import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import { setAttr, hasNotAttrString, toggleAttr, hasAttr } from "./utils/attrs.js";
import { doWithAnimation, globalContext, templateAsData } from "./utils/misc.js";
import { byId } from "./utils/query.js";

const { HTML } = createRegistry(globalContext());
define(
    "button[data-toggle]",
    class extends HTML.Button {
        get el() {
            return byId(this.dataset.toggle);
        }

        connectedCallback() {
            on("click", this);
            const el = this.el;
            const d = this.dataset;
            this.ariaExpanded = hasNotAttrString(el, "hidden");
            setAttr(this, "aria-controls", d.toggle);

            // Content can be really annoying to put in a data attr, so we support template as well
            templateAsData(this, ["hidden", "visible"], "toggle");

            // keep track of original value
            d.toggleOriginal = this.innerHTML.trim();

            // Update aria expanded state
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
            const open = this.ariaExpanded === "false";
            if (open) {
                doWithAnimation(el, () => {}, open);
                toggleAttr(el, "hidden");
            } else {
                doWithAnimation(
                    el,
                    () => {
                        toggleAttr(el, "hidden");
                    },
                    open,
                );
            }
            this.update(open ? "true" : "false");
        }

        update(state) {
            const el = this.el;
            const d = this.dataset;

            this.ariaExpanded = state || hasNotAttrString(el, "hidden");

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
