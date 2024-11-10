/**
 * Syntax sugar when storing callback functions for elements
 * The element is always passed to the function
 * @param {WeakMap|Map} map
 * @param {Element} el
 */
export function getAndRun(map, el) {
    const fn = map.get(el);
    if (fn && typeof fn === "function") {
        fn(el);
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

/**
 * Update a specific entry of an object stored in a map
 * @param {Map|WeakMap} map
 * @param {HTMLElement} el
 * @param {String} k
 * @param {*} v
 */
export function updateMapData(map, el, k, v) {
    const data = map.get(el);
    if (data) {
        data[k] = v;
        map.set(el, data);
    }
}
