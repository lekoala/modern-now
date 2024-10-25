import { toArray } from "./misc.js";

/**
 * Check if the target is self
 * The default use case is that no element is specified and the handler is simply handleEvent on the element itself
 * @link https://webreflection.medium.com/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
 * @param {HTMLElement|EventListenerOrEventListenerObject} handler
 * @param {HTMLElement|Document|Window} el
 * @returns {HTMLElement|Document|Window}
 */
const optionalTarget = (handler, el) => {
    // We passed an element, use that
    if (el) {
        return el;
    }
    // 2nd argument was a function and not an element, we target the document
    if (typeof handler === "function") {
        return document;
    }
    // Handler is an HTMLElement, use this we handleEvent
    if (handler instanceof HTMLElement) {
        return handler;
    }
    throw "Invalid handler";
};

/**
 * Automatically set passive options based on type
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners
 * @param {string} type
 * @returns {AddEventListenerOptions}
 */
const passiveOpts = (type) => {
    if (
        [
            "scroll",
            "wheel",
            "touchstart",
            "touchmove",
            "touchenter",
            "touchend",
            "touchleave",
            "mouseout",
            "mouseleave",
            "mouseup",
            "mousedown",
            "mousemove",
            "mouseenter",
            "mousewheel",
            "mouseover",
        ].includes(type)
    ) {
        return { passive: true };
    }
    return {};
};

/**
 * Typically use like this:
 * on("click", this); // bound to this handleEvent
 * on("click", this, document); // bound to document and handled by this handleEvent
 * on("click", () => {}); // bound to document
 * Automatically sets passive option
 *
 * @param {String|Array} event
 * @param {EventListenerOrEventListenerObject|HTMLElement} handler
 * @param {HTMLElement|Document|Window} el
 */
export function on(event, handler, el = null) {
    const target = optionalTarget(handler, el);
    for (const ev of toArray(event)) {
        //@ts-ignore
        target.addEventListener(ev, handler, passiveOpts(ev));
    }
}

/**
 *  @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#once
 * @param {String|Array} event
 * @param {EventListenerOrEventListenerObject|HTMLElement} handler
 * @param {HTMLElement|Document|Window} el
 */
export function once(event, handler, el = null) {
    const target = optionalTarget(handler, el);
    for (const ev of toArray(event)) {
        //@ts-ignore
        target.addEventListener(ev, handler, {
            once: true,
        });
    }
}

/**
 * @param {String|Array} event
 * @param {EventListenerOrEventListenerObject|HTMLElement} handler
 * @param {HTMLElement|Document} el
 */
export function off(event, handler, el = null) {
    const target = optionalTarget(handler, el);
    for (const ev of toArray(event)) {
        //@ts-ignore
        target.removeEventListener(ev, handler, passiveOpts(ev));
    }
}

/**
 * @param {String} name
 * @param {HTMLElement|Document} el
 * @param {any} data
 * @param {Boolean} bubbles
 */
export function dispatch(name, el = document, data = {}, bubbles = false) {
    const opts = {};
    if (bubbles) {
        opts.bubbles = true;
    }
    if (data) {
        opts.detail = data;
    }
    el.dispatchEvent(new CustomEvent(name, opts));
}
