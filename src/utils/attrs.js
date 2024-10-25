import { isObject, toBool } from "./misc.js";

// Use short names like getAttr to avoid automcomplete from ide

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {string}
 */
export function getAttr(el, name) {
    return el.getAttribute(name);
}

/**
 * Empty attributes like data-on are considered true
 * @param {HTMLElement} el
 * @param {string} name using camelCase notation
 * @returns {boolean}
 */
export function getBoolData(el, name) {
    return el.dataset[name] === "" || toBool(el.dataset[name]);
}

/**
 * Convert boolean values (true/false strings) to actual booleans
 * Leave the value as is otherwise
 * @param {HTMLElement} el
 * @param {string} name using camelCase notation
 * @returns {string|boolean}
 */
export function getMixedBoolData(el, name) {
    const v = el.dataset[name];
    if (v === "false") {
        return false;
    }
    if (v === "true") {
        return true;
    }
    return v;
}

/**
 * Check if data is set
 * @param {HTMLElement} el
 * @param {string} name camelCased name
 * @returns {boolean}
 */
export function hasData(el, name) {
    return el.dataset[name] !== undefined;
}

/**
 * @param {HTMLElement} el
 * @param {string} name camelCased name
 * @returns {string}
 */
export function getData(el, name) {
    return el.dataset[name];
}

/**
 *
 * @param {HTMLElement} el
 * @param {string|Object} name
 * @param {string|Number|Boolean} value
 */
export function setData(el, name, value = null) {
    const obj = isObject(name) ? name : { [name]: value };
    for (const [k, v] of Object.entries(obj)) {
        el.dataset[k] = `${v}`;
    }
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {boolean}
 */
export function hasAttr(el, name) {
    return el.hasAttribute(name);
}

/**
 * Returns true|false as string
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {string}
 */
export function hasAttrString(el, name) {
    return hasAttr(el, name) ? "true" : "false";
}

/**
 * Returns true|false as string
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {string}
 */
export function hasNotAttrString(el, name) {
    return hasAttr(el, name) ? "false" : "true";
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {boolean}
 */
export function toggleAttr(el, name) {
    return el.toggleAttribute(name);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string|Object} name
 * @param {string|Number|Boolean} value
 */
export function setAttr(el, name, value = null) {
    const obj = isObject(name) ? name : { [name]: value };
    for (const [k, v] of Object.entries(obj)) {
        el.setAttribute(k, `${v}`);
    }
}

/**
 * @param {HTMLElement} el
 * @param {string|Array} name
 */
export function removeAttr(el, name) {
    const arr = Array.isArray(name) ? name : [name];
    for (const k of arr) {
        el.removeAttribute(k);
    }
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Boolean} flag
 */
export function setRemoveAttr(el, name, flag) {
    flag ? setAttr(el, name, "") : removeAttr(el, name);
}

/**
 * @param {HTMLElement} el
 * @param {Object} map
 */
export function assignStyles(el, map) {
    Object.assign(el.style, map);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {string}
 */
export function getCssVar(el, name) {
    return el.style.getPropertyValue(`--${name}`);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @param {string} value
 */
export function setCssVar(el, name, value) {
    el.style.setProperty(`--${name}`, value);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @returns {Boolean}
 */
export function hasClass(el, name) {
    return el.classList.contains(name);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 */
export function addClass(el, name) {
    el.classList.add(name);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 */
export function removeClass(el, name) {
    el.classList.remove(name);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 */
export function toggleClass(el, name) {
    el.classList.toggle(name);
}

/**
 *
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Boolean} flag
 */
export function addRemoveClass(el, name, flag) {
    flag ? addClass(el, name) : removeClass(el, name);
}

/**
 * Call a function on an object if set
 * @param {HTMLElement|Object} el
 * @param {string} name
 * @param {Boolean} flag An optional flag
 * @returns {*}
 */
export function callProp(el, name, flag = null) {
    const fn = el[name];
    if (fn && (flag === null || flag === true)) {
        return fn();
    }
}
