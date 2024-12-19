import { on, off, dispatch } from "./utils/events.js";
import { getBoolData } from "./utils/attrs.js";
import dynamicBehaviour from "./dynamicBehaviour.js";

// add mouseenter to allow proper size after resizing the window
const events = ["input", "focusout", "mouseenter"];

const eventHandler = (ev) => {
    const el = ev.target;
    if ((!ev || ev.type === "focusout") && getBoolData(el, "trim")) {
        el.value = el.value.trim();
    }

    const s = el.style;
    // reset height
    s.height = "0";

    // compute new height or set back to null
    const h = el.scrollHeight;
    s.height = h === 0 ? null : `${h}px`;
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
        dispatch("input", el);
        on(events, eventHandler, el);
    },
    /**
     * @param {HTMLTextAreaElement} el
     */
    (el) => {
        off(events, eventHandler, el);
    },
);
