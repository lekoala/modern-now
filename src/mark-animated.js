import { injectCss } from "./utils/misc.js";
import lazy from "./utils/lazy.js";
import { setCssVar } from "./utils/attrs.js";
import { getAndRun } from "./utils/map.js";
import dynamicBehaviour from "./dynamicBehaviour.js";

function convertRange(value, r1, r2) {
    return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

const css = /*css*/ `
@media (prefers-reduced-motion: no-preference) {
    mark[data-animated]:not([class]) {
        --mark-bg-color: var(--text-highlight, #fd3);
        --mark-text-color: var(--text-dark, #333);
        --mark-duration: 1s;
        --mark-ease: cubic-bezier(0.25, 1, 0.5, 1);
        background: none;
        background-repeat: no-repeat;
        background-size: 0 100%;
        background-image: linear-gradient(var(--mark-bg-color),
                var(--mark-bg-color));
        transition: color calc(var(--mark-duration) / 4) var(--mark-ease),
            background-color calc(var(--mark-duration) / 4) var(--mark-ease),
            background-size var(--mark-duration) var(--mark-ease);
    }
    mark[data-animated][data-active]:not([class]) {
        background-size: 100% 100%;
        color: var(--mark-text-color);
    }
}`;
const id = "mark-style";
injectCss(css, id);

const cleanupMap = new WeakMap();

function initMark(el) {
    // adjust duration to text length
    const c = el.innerText.length;
    setCssVar(el, "mark-duration", `${convertRange(c, [30, 120], [1, 2])}s`);
    // start animation
    el.dataset.active = "true";
}

dynamicBehaviour(
    "mark[data-animated]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        cleanupMap.set(
            el,
            lazy(el, (node) => {
                initMark(node);
            }),
        );
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        getAndRun(cleanupMap, el);
    },
);
