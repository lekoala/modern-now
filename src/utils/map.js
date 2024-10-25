/**
 * Syntax sugar when storing callback functions for elements
 * @param {WeakMap|Map} map
 * @param {Element} el
 */
export function getAndRun(map, el) {
    const fn = map.get(el);
    if (fn && typeof fn === "function") {
        fn();
    }
}

/**
 * Syntax sugar to store values in a map
 * @param {WeakMap|Map} map
 * @param {Element} el
 * @param {*} value
 */
export function setIfValue(map, el, value) {
    if (value) {
        map.set(el, value);
    }
}
