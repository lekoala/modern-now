import dynamicBehaviour from "./dynamicBehaviour.js";
import { dotPath, simpleConfig } from "./utils/misc.js";
import { setIfValue, getAndRun } from "./utils/map.js";
import { on } from "./utils/events.js";

const q = new Set();
const cleanupMap = new WeakMap();

/**
 * @param {HTMLElement} el
 */
function init(el) {
    const data = el.dataset;
    const name = data.behaviour;

    const config = simpleConfig(data.behaviourConfig);
    const handler = dotPath(name);
    if (handler) {
        const cleanup = handler(el, config);
        setIfValue(cleanupMap, el, cleanup);
    } else {
        // Maybe it's not loaded yet
        q.add(el);
    }
}

// Make sure all scripts are loaded then run init
on(
    "load",
    /**
     * @param {Event} ev
     */
    (ev) => {
        for (const el of q) {
            q.delete(el);
            init(el);
        }
    },
    window,
);

dynamicBehaviour(
    "[data-behaviour]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        init(el);
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        q.delete(el);
        getAndRun(cleanupMap, el);
    },
);
