import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { setAttr, hasNotAttrString, toggleAttr, hasAttr, removeAttr } from "./utils/attrs.js";
import { doWithAnimation, globalContext, templateAsData } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";

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
                const others = qsa(`[data-toggle-group="${d.toggleGroup}"]`);
                for (const other of others) {
                    if (other === this) {
                        continue;
                    }
                    dispatch("toggleClose", other);
                }
            }

            // make sure to have something like [hidden] { display: none !important}
            // https://meowni.ca/hidden.is.a.lie.html
            const open = this.ariaExpanded === "false";
            if (open) {
                doWithAnimation(el, () => {}, true);
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
