import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { byId } from "./utils/query.js";
import { globalContext } from "./utils/misc.js";

const { HTML } = createRegistry(globalContext());
define(
    "input[data-password]",
    class extends HTML.Input {
        connectedCallback() {
            on("change", this);
        }

        disconnectedCallback() {
            off("change", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $change(ev) {
            const el = byId(this.dataset.password, "input");
            el.type = this.checked ? "text" : "password";
        }
    },
);
