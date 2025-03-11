import dynamicBehaviour from "./dynamicBehaviour.js";
import { off, on } from "./utils/events.js";

function handleLabelClick(ev) {
    if (ev.detail > 1) {
        ev.preventDefault();
    }
}

// Prevents text selection when double clicking on a label
// This is opiniated but can be suppressed
dynamicBehaviour(
    "label:not([data-dblclick])",
    /**
     * @param {HTMLButtonElement} el
     */
    (el) => {
        on("mousedown", handleLabelClick, el);
    },
    /**
     * @param {HTMLButtonElement} el
     */
    (el) => {
        off("mousedown", handleLabelClick, el);
    },
);
