import { getAndRun } from "./map.js";
import { supportsIntersectionObserver } from "./misc.js";

/**
 * @type {WeakMap<Element,Function>}
 */
const map = new WeakMap();
let observer;

// There is a polyfill, but it's probably not worth it to implement it
// @link https://github.com/GoogleChromeLabs/intersection-observer
if (supportsIntersectionObserver()) {
    observer = new IntersectionObserver((entries, obs) => {
        const activeEntries = entries.filter((entry) => entry.isIntersecting);
        for (const activeEntry of activeEntries) {
            const t = activeEntry.target;
            obs.unobserve(t);
            getAndRun(map, t);
        }
    });
}

/**
 * Element will trigger callback when visible in intersection observer
 * @param {*} el
 * @param {Function} cb An init callback that gets the element as the first argument
 * @returns {Function} a callback to remove the observer
 */
export default function lazy(el, cb) {
    // If observer is not supported, initialize immediately
    if (!observer) {
        cb(el);
        // Dummy cleanup
        return () => {};
    }
    map.set(el, cb);
    observer.observe(el);
    return () => {
        map.delete(el);
        return observer.unobserve(el);
    };
}
