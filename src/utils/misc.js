import { addClass, getMixedBoolData, hasAttr, hasData, removeClass } from "./attrs.js";
import { once } from "./events.js";
import { qs, qsa } from "./query.js";
import { ucfirst } from "./str.js";

/**
 * @param {String} css
 * @param {String|null} id
 */
export function injectCss(css, id = null) {
    const style = ce("style");
    if (id) {
        style.id = id;
    }
    style.textContent = css;
    document.head.append(style);
}

/**
 * @param {HTMLElement} el
 * @returns {Boolean}
 */
export function isVisible(el) {
    // no width or height
    if (el.offsetWidth === 0 || el.offsetHeight === 0) {
        return false;
    }
    // hidden by style
    if (el.style.display === "none" || el.style.visibility === "hidden") {
        return false;
    }
    return true;
}

/**
 * A simple checkVisbility polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility
 * @param {HTMLElement} el
 * @returns {Boolean}
 */
export function checkVisibility(el) {
    if (typeof el.checkVisibility === "function") {
        return el.checkVisibility();
    }
    return isVisible(el);
}

/**
 * @param {HTMLElement} el
 */
export function show(el) {
    el.style.display = "inherit";
}

/**
 * @param {HTMLElement} el
 */
export function hide(el) {
    el.style.display = "none";
}

/**
 * @returns {HTMLElement}
 */
export function activeEl() {
    const el = document.activeElement;
    if (el instanceof HTMLElement) {
        return el;
    }
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {HTMLElement} parent
 * @returns {HTMLElementTagNameMap[K]}
 */
export function ce(tagName, parent = null) {
    const el = document.createElement(tagName);
    if (parent) {
        parent.appendChild(el);
    }
    return el;
}

/**
 * @param {HTMLElement} newNode
 * @param {HTMLElement} existingNode
 */
export function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

/**
 * @param {Number|Boolean|String} v
 * @returns {Boolean}
 */
export function toBool(v) {
    return ["true", "1"].includes(String(v).toLowerCase());
}

/**
 *
 * @param {Array|string} v
 * @returns {Array}
 */
export function toArray(v) {
    return Array.isArray(v) ? v : [v];
}

/**
 *
 * @param {string|Number} v
 * @returns {Number}
 */
export function toInt(v) {
    if (v === undefined) {
        return 0;
    }
    return Number.parseInt(`${v}`);
}

/**
 *
 * @param {string|Number} v
 * @returns {Number}
 */
export function toFloat(v) {
    if (v === undefined) {
        return 0;
    }
    return Number.parseFloat(`${v}`);
}

/**
 * @param {*} v
 * @returns {Boolean}
 */
export function isObject(v) {
    return typeof v === "object" && v !== null;
}

/**
 * @param {*} v
 * @returns {Boolean}
 */
export function isArray(v) {
    return Array.isArray(v);
}

/**
 * @param {*} v
 * @returns {Boolean}
 */
export function isString(v) {
    return typeof v === "string" || v instanceof String;
}

/**
 * @param {string} v
 * @returns {Boolean|Number|null|String}
 */
export function strToVar(v) {
    if (!isString(v)) {
        return null;
    }
    const lv = v.toLowerCase();
    if (lv === "true") {
        return true;
    }
    if (lv === "false") {
        return false;
    }
    if (v === Number(v).toString()) {
        return Number(v);
    }
    return v;
}

/**
 * @param {String} v
 * @returns {Array}
 */
export function strArray(v, sep = ",") {
    if (!v) {
        return [];
    }
    return v.split(sep).map((s) => s.trim());
}

/**
 * This helps to make your ide happy
 * @template {keyof HTMLElementTagNameMap} K
 * @param {Element|EventTarget} el
 * @param {K} type
 * @returns {HTMLElementTagNameMap[K]}
 */
export function as(el, type = null) {
    //@ts-ignore
    return el;
}

/**
 * Convert child template contents to data attributes
 * Template element is removed afterwards
 * @param {HTMLElement} el
 * @param {Array} dataAttrs A set of attributes to examine
 * @param {String} prefix optional prefix for attributes
 */
export function templateAsData(el, dataAttrs = [], prefix = null) {
    for (const att of dataAttrs) {
        const a = prefix ? `${prefix}-att` : att;
        const t = qs(`template[data-${a}]`, "template");
        if (t) {
            el.setAttribute(`data-${a}`, t.innerHTML);
            t.remove();
        }
    }
}

/**
 * Merge data attributes in config object
 * @param {HTMLElement} el
 * @param {Object} config
 * @param {Array} dataAttrs using camelCase notation
 * @param {String} prefix optional prefix for attributes
 */
export function dataAsConfig(el, config, dataAttrs = [], prefix = null) {
    for (const att of dataAttrs) {
        const n = prefix ? `${prefix}${ucfirst(att)}` : att;
        if (hasData(el, n)) {
            config[att] = getMixedBoolData(el, n);
        }
    }
}

/**
 * Find value in object using dot notation
 * @param {string} path
 * @param {Object} scope Defaults to window
 * @returns {*}
 */
export function dotPath(path, scope = window) {
    return path.split(".").reduce((r, p) => r[p], scope);
}

/**
 * Clear inputs in a form
 * @param {Array<HTMLInputElement&HTMLSelectElement>} elements
 */
export function clearInputs(elements) {
    for (const field of elements) {
        const type = field.type.toLowerCase();
        if (["radio", "checkbox"].includes(type)) {
            field.checked = false;
        } else if (type.indexOf("select") === 0) {
            field.selectedIndex = -1;
        } else if (!["reset", "submit", "button"].includes(field.type)) {
            field.value = "";
        }
    }
}

/**
 * Ignore calls until timeout has passed (great when listening to input)
 * @param {Function} fn
 * @param {Number} timeout
 * @returns {Function}
 */
export function debounce(fn, timeout = 300) {
    let timer;
    return (...args) => {
        clearTo(timer);
        timer = setTimeout(() => {
            timer = undefined;
            fn(...args);
        }, timeout);
    };
}

/**
 * Triggers right with the first event, and ignores subsequent events (great when listening to clicks)
 * @param {Function} fn
 * @param {Number} timeout
 * @returns {Function}
 */
export function debounceLeading(fn, timeout = 300) {
    let timer;
    return (...args) => {
        if (!timer) {
            fn(...args);
        }
        clearTo(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}

/**
 * Parses json like key: value strings into a proper json string
 * Values with single quotes need to be wrapped in double quotes
 * Also allows calling a function to provide config, like myConfig()
 * @param {string} str
 * @returns {Object}
 */
export function simpleConfig(str) {
    if (!str) {
        return {};
    }
    // it's a provider
    if (str.endsWith("()")) {
        const fn = dotPath(str.replace("()", ""));
        if (fn) {
            return fn();
        }
        return {};
    }
    // it's just a string
    if (!str.includes(":")) {
        return { default: str };
    }
    let jsonString = str;
    // it's not a json string and it contains key:value elements
    if (!str.startsWith("{") && /[\w'"]\s*:\s*/.test(str)) {
        // make it a valid json string by wrapping in double quotes
        // the regex match key pairs : any valid string, quoted or unquoted => a single quoted string | a double quoted string | an [] | another value (number, bool...)
        jsonString = `{${str.replace(/([^:\s{,]*)\s*:\s*('[^']*'|"[^"]*"|([\[].*?[\]])|[^,'"{\[]*)/g, (m, p1, p2) => `"${p1.replace(/['"]/g, "")}":${p2.includes('"') ? p2 : p2.replace(/'/g, '"')}`)}}`;
    }
    try {
        return replaceCallbacks(JSON.parse(jsonString));
    } catch (error) {
        throw `Invalid config ${str} interpreted as ${jsonString} with error ${error}`;
    }
}

/**
 * Convert a simple string into a node, an array of node or a properly typed value
 * @param {String} v
 * @returns {HTMLElement|Array<HTMLElement>|String|Number|null|Boolean}
 */
export function simpleParam(v) {
    if (isString(v)) {
        if (v.startsWith("#")) {
            return qs(v);
        }
        if (v.startsWith(".")) {
            return qsa(v);
        }
    }
    return strToVar(v);
}

/**
 * Replace functions value objects in a given object
 * This allows you to set reference to actual function visible
 * in the global scope using the __fn: 'myfunctionname' object syntax
 * @param {Object|string} obj
 * @returns {Object}
 */
export function replaceCallbacks(obj) {
    for (const [k, v] of Object.entries(obj)) {
        if (v && typeof v === "object") {
            const fn = v.__fn;
            if (isString(fn)) {
                obj[k] = dotPath(fn);
            } else {
                replaceCallbacks(v);
            }
        }
    }
    return obj;
}

/**
 * @param {Document} root
 * @returns {HTMLElement}
 */
export function getDocEl(root = document) {
    return root.documentElement;
}

/**
 * @returns {String}
 */
export function getDocLang() {
    return getDocEl().getAttribute("lang") || "en";
}

/**
 * @returns {Number}
 */
export function getScrollBarWidth() {
    const docEl = getDocEl();
    // There is no scrollbar, no need to compute it's size
    if (docEl.scrollHeight <= docEl.clientHeight) {
        return 0;
    }
    const el = ce("div");
    el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
    document.body.appendChild(el);
    const width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
}

/**
 * Basically test for Safari < 15.4 and firefox < 98
 * @link https://caniuse.com/dialog
 * @returns {Boolean}
 */
export function supportsDialog() {
    return typeof HTMLDialogElement !== "undefined";
}

/**
 * @link https://caniuse.com/popover
 * @returns {Boolean}
 */
export function supportsPopover() {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: trusted
    return HTMLElement.prototype.hasOwnProperty("popover");
}

/**
 * @link https://caniuse.com/intersectionobserver
 * @returns {Boolean}
 */
export function supportsIntersectionObserver() {
    return "IntersectionObserver" in window;
}

/**
 * @returns {Boolean}
 */
export function animationEnabled() {
    return (
        //@ts-ignore
        window.matchMedia("(prefers-reduced-motion: no-preference)") === true ||
        window.matchMedia("(prefers-reduced-motion: no-preference)").matches === true
    );
}

/**
 * This simply avoids doing if(to) clearTimeout(to);
 * @param {*} to
 */
export function clearTo(to) {
    if (to) {
        clearTimeout(to);
    }
}

const timeoutMap = new WeakMap();
/**
 * Add a temporary text to a node
 * Triggers popover api if needed
 * Works well with :empty / :not(:empty) css selectors
 * Animates on close with is-closing if animation is set
 * @link https://caniuse.com/mdn-css_selectors_empty
 * @param {HTMLElement} el
 * @param {string} text
 */
export function ephemeralText(el, text) {
    const to = timeoutMap.get(el);
    clearTo(to);
    el.innerHTML = text;
    if (hasAttr(el, "popover") && supportsPopover()) {
        el.showPopover();
    }
    timeoutMap.set(
        el,
        setTimeout(() => {
            doWithAnimation(el, () => {
                el.innerHTML = "";
            });
        }, toInt(el.dataset.duration) || 5000),
    );
}

/**
 * If animations are enabled and if the element has animation
 * wait until animationend to execute callback
 * Add a "is-closing" helper class while closing
 * @param {HTMLElement} el
 * @param {Function} cb
 * @param {Boolean} open
 */
export function doWithAnimation(el, cb, open = false) {
    const closingClass = "is-closing";
    const openingClass = "is-opening";
    const cls = open ? openingClass : closingClass;

    if (animationEnabled()) {
        const styles = getComputedStyle(el);
        // no animation, simply close
        // TODO: requires some work on older browser
        const noAnimation = styles.animation.length === 0 || styles.animation.startsWith("none ");
        if (noAnimation) {
            cb();
        } else {
            once(
                "animationend",
                /**
                 * @param {AnimationEvent} ev
                 */
                (ev) => {
                    removeClass(el, cls);
                    cb();
                },
                el,
            );
            addClass(el, cls);
        }
    } else {
        cb();
    }
}

/**
 * Return required objects for createRegistry to help nonchalance when globalThis
 * is not defined (IOS 11)
 * @returns {Object}
 */
export function globalContext() {
    return {
        document: document,
        MutationObserver: window.MutationObserver,
        Element: window.Element,
    };
}

/**
 * Observice specific attributes of an element
 * Returns a function to cleanup mutation observer
 * @param {HTMLElement} el
 * @param {String[]} attrs
 * @param {Function} cb A function that takes the modified element
 * @returns {Function} A cleanup function to stop observing
 */
export function observeAttrs(el, attrs, cb) {
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                cb(mutation.target, mutation.oldValue);
            }
        }
    };
    let MO = new MutationObserver(callback);
    MO.observe(el, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: attrs,
    });

    return () => {
        MO.disconnect();
        MO = null;
    };
}
