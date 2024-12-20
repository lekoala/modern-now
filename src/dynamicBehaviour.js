import QSAO from "qsa-observer";
import lazy from "./utils/lazy.js";
import { getAndRun } from "./utils/map.js";
import { qsa } from "./utils/query.js";
import { getBoolData } from "./utils/attrs.js";

// Sample
// dynamicBehaviour(
//     "selector",
//     /**
//      * @param {HTMLElement} el
//      */
//     (el) => {},
//     /**
//      * @param {HTMLElement} el
//      */
//     (el) => {},
// );

/**
 * @typedef DynamicEntry
 * @property {Function} callback
 * @property {Function} cleanup
 * @property {WeakSet} initialized
 * @property {WeakMap} lazyMap
 */

/**
 * Store callback function
 * @type {Object.<string,DynamicEntry>}
 */
const map = {};
/**
 * An array of selectors
 * @type {Array<String>}
 */
const query = [];

//@ts-ignore
const DEBUG = window.DEBUG || false;

const {
    drop, // an utility to drop a list of elements from being considered live
    flush, // an utility to flush synchronously all queued mutations
    observer, // the MutationObserver created by QSAO(...)
    parse, // an utility to parse new elements (i.e. after adding a selector to the query list)
} = QSAO({
    query, // list of selectors to observe
    document, // optional, as it's document by default

    /**
     * The method that receives all elements that match one or more
     * selectors in the query, and are either connected or disconnected
     *
     * @param {HTMLElement} element
     * @param {Boolean} connected
     * @param {String} selector
     */
    async handle(element, connected, selector) {
        const handler = map[selector];
        const initialized = handler.initialized;
        const lazyMap = handler.lazyMap;

        if (DEBUG) {
            console.log(element, connected, selector);
        }

        if (connected) {
            const init = () => {
                // Already initialized with this selector
                if (initialized.has(element)) {
                    return;
                }
                handler.callback(element);
                initialized.add(element);
            };
            // If we have a data-lazy attribute, lazily trigger init method when element is visible
            // data-lazy="false" will not trigger lazy mode
            if (getBoolData(element, "lazy")) {
                lazyMap.set(element, lazy(element, init));
            } else {
                init();
            }
        } else {
            // https://nolanlawson.com/2024/12/01/avoiding-unnecessary-cleanup-work-in-disconnectedcallback/
            await Promise.resolve();

            if (!element.isConnected && initialized.has(element)) {
                const cleanup = handler.cleanup;
                if (cleanup) {
                    cleanup(element);
                }
                getAndRun(lazyMap, element);
                initialized.delete(element);
            }
        }
    },
});

export { drop, parse, flush };

/**
 * @param {String} selector The selector to match the behaviour
 * @param {Function} callback
 * @param {Function|null} cleanup
 */
export default (selector, callback, cleanup = null) => {
    // Update handler map
    const initialized = new WeakSet();
    const lazyMap = new WeakMap();
    map[selector] = { callback, cleanup, initialized, lazyMap };

    // Re-run QSAO with the new selector
    if (!query.includes(selector)) {
        query.push(selector);
        parse(qsa(selector));
    }
};
