import dynamicBehaviour from "./dynamicBehaviour.js";
import { dotPath, simpleConfig } from "./utils/misc.js";
import { setIfValue, getAndRun } from "./utils/map.js";
import { on } from "./utils/events.js";

const q = new Set();
/**
 * @type {WeakMap<Element,Function>}
 */
const cleanupMap = new WeakMap();

function processQueue() {
    for (const el of q) {
        const res = init(el);
        if (res) {
            q.delete(el);
        }
    }
}

/**
 * Triggers init for the element. If the handler is not found
 * add to a queue that can be processed later (eg: on page load)
 * @param {HTMLElement} el
 */
function init(el) {
    const data = el.dataset;
    const name = data.behaviour;

    const config = simpleConfig(data.behaviourConfig);
    const handler = dotPath(name);
    if (handler) {
        const cleanupFn = handler(el, config);
        setIfValue(cleanupMap, el, cleanupFn);
        return true;
    }

    // Maybe it's not loaded yet, it will run thanks to our getter/setter or the load event
    q.add(el);

    // If the function is defined later, define a getter/setter to know about it
    if (!name.includes(".") && !Object.hasOwn(window, name)) {
        Object.defineProperty(window, name, {
            get: function () {
                return this[`_${name}`];
            },
            set: function (val) {
                this[`_${name}`] = val;
                processQueue();
            },
        });
    }

    return false;
}

// Make sure all scripts are loaded then run init
on(
    "load",
    /**
     * @param {Event} ev
     */
    (ev) => {
        processQueue();
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
