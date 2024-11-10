import QSAO from "../node_modules/qsa-observer/esm.js";
import { getBoolData } from "./utils/attrs.js";
import lazy from "./utils/lazy.js";
import { getAndRun } from "./utils/map.js";
import { qsa } from "./utils/query.js";

/**
 * Store callback function
 */
const map = {};
/**
 * An array of selectors
 */
const query = [];

const lazyMap = new WeakMap();

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
    handle(element, connected, selector) {
        if (connected) {
            const init = () => {
                map[selector][0](element);
            };
            // If we have a data-lazy attribute, lazily trigger init method
            if (getBoolData(element, "lazy")) {
                lazyMap.set(element, lazy(element, init));
            } else {
                init();
            }
        } else {
            const cleanup = map[selector][1];
            if (cleanup) {
                cleanup(element);
            }
            getAndRun(lazyMap, element);
        }
    },
});

/**
 * @param {String} selector The selector to match the behaviour
 * @param {Function} callback
 * @param {Function|null} cleanup
 */
export default (selector, callback, cleanup = null) => {
    // Update handler map
    map[selector] = [callback, cleanup];

    // Re-run QSAO with the new selector
    if (!query.includes(selector)) {
        query.push(selector);
        parse(qsa(selector));
    }
};
