import { getAndRun } from "./map.js";

const map = new WeakMap();
const observer = new IntersectionObserver((entries, obs) => {
    const activeEntries = entries.filter((entry) => entry.isIntersecting);
    for (const activeEntry of activeEntries) {
        const t = activeEntry.target;
        obs.unobserve(t);
        getAndRun(map, t);
    }
});

/**
 * Element will trigger callback on init
 * @param {*} el
 * @param {Function} cb An init callback that must already be scoped if you want to use this
 * @returns {Function} a callback to remove the observer
 */
export default function lazy(el, cb) {
    map.set(el, cb);
    observer.observe(el);
    return () => {
        map.delete(el);
        return observer.unobserve(el);
    };
}
