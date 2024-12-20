import { on, off, dispatch } from "./utils/events.js";
import { getBoolData } from "./utils/attrs.js";
import dynamicBehaviour from "./dynamicBehaviour.js";
import { toFloat } from "./utils/misc.js";

// add mouseenter to allow proper size after resizing the window
const events = ["input", "focusout", "mouseenter"];

const eventHandler = (ev) => {
    const el = ev.target;
    if ((!ev || ev.type === "focusout") && getBoolData(el, "trim")) {
        el.value = el.value.trim();
    }

    // note: scrollHeight doesn't take border with into account
    const s = el.style;

    // reset height
    s.height = "0";

    // compute new height or set back to null
    const sh = el.scrollHeight;

    s.height = sh === 0 ? null : `${sh}px`;
};

dynamicBehaviour(
    "textarea[data-autogrow]",
    /**
     * @param {HTMLTextAreaElement} el
     */
    (el) => {
        el.rows = 1;
        el.style.overflow = "hidden";
        el.style.resize = "none";
        on(events, eventHandler, el);
        dispatch("input", el);
    },
    /**
     * @param {HTMLTextAreaElement} el
     */
    (el) => {
        off(events, eventHandler, el);
    },
);
