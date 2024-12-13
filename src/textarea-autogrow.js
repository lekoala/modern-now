import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import { getBoolData } from "./utils/attrs.js";
import { globalContext } from "./utils/misc.js";

// add mouseenter to allow proper size after resizing the window
const events = ["input", "focusout", "mouseenter"];
const { HTML } = createRegistry(globalContext());
define(
    "textarea[data-autogrow]",
    class extends HTML.TextArea {
        connectedCallback() {
            this.rows = 1;
            this.style.overflow = "hidden";
            this.style.resize = "none";
            this.handleEvent(null);
            on(events, this);
        }

        disconnectedCallback() {
            off(events, this);
        }

        /**
         * @param {InputEvent|null} ev
         */
        handleEvent(ev) {
            if ((!ev || ev.type === "focusout") && getBoolData(this, "trim")) {
                this.value = this.value.trim();
            }

            const s = this.style;
            // reset height
            s.height = "0";

            // compute new height or set back to null
            const h = this.scrollHeight;
            s.height = h === 0 ? null : `${h}px`;
        }
    },
);
