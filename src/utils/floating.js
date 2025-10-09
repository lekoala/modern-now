// This is a set of functions to help positioning elements
// CSS Anchoring is not easily polyfillable and therefore we rely on native js for this
// This is very similar to floating ui but with a much more compact scope

/**
 * @typedef FloatingConfig
 * @property {HTMLElement} [scopeEl]
 * @property {Placement|String} [placement]
 * @property {Number|String} [distance]
 * @property {Boolean} [flip] Flip if it overflows on axis
 * @property {Boolean} [shift] Shift if it overflows on x axis
 * @property {Number} [shiftPadding] When shifting, add extra space
 */

import { setCssVar } from "./attrs.js";
import { dispatch, on } from "./events.js";
import { debounce, getDocEl, toInt, isRTL } from "./misc.js";

/**
 * @typedef Coords
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef {('top'|'top-end'|'top-start'|'bottom'|'bottom-end'|'bottom-start'|'left'|'left-end'|'left-start'|'right'|'right-end'|'right-start')} Placement
 */

/**
 * @typedef {('x'|'y')} Axis
 */

/**
 * @typedef {('start'|'end')} Alignement
 */

/**
 * @typedef {('width'|'height')} Length
 */

/**
 * @typedef {('top'|'right'|'bottom'|'left')} Side
 */

export const floatingReposition = "floatingReposition";
export const floatingHide = "floatingHide";

// Update position of elements on scroll or resize
// We need a set to allow looping over elements
const elements = new Set();
let ticking = false;
/**
 * @param {Event} ev
 */
const onResize = (ev) => {
    for (const el of elements) {
        /** @type {Window|HTMLElement} */
        //@ts-ignore
        const t = ev.target;
        // Only position if the event contains our target
        const shouldCompute = t instanceof Window || t.contains(el);
        if (shouldCompute) {
            dispatch(floatingReposition, el);
        }
    }
    ticking = false;
};
/**
 * @param {Event} ev
 */
const rafCallback = (ev) => {
    if (!ticking) {
        requestAnimationFrame(() => onResize(ev));
    }
    ticking = true;
};
const scrollEndCallback = debounce((ev) => {
    onResize(ev);
}, 10);
// Don't debounce because it's really ugly, use ticking instead
on("scroll", (ev) => {
    rafCallback(ev);
    // smooth scrolling can create some extra move
    scrollEndCallback(ev);
});
on("resize", rafCallback, window);

// Escape
on(
    "keydown",
    /**
     * @param {KeyboardEvent} ev
     */
    (ev) => {
        if (ev.key === "Escape") {
            //if esc key was not pressed in combination with ctrl or alt or shift
            const isNotCombinedKey = !(ev.ctrlKey || ev.altKey || ev.shiftKey);
            if (isNotCombinedKey) {
                for (const el of elements) {
                    dispatch(floatingHide, el);
                }
            }
        }
    },
);

/**
 * @param {Placement} placement
 * @returns {Side}
 */
export function getSide(placement) {
    //@ts-ignore
    return placement.split("-")[0];
}

/**
 * @param {Placement} placement
 * @returns {Alignement}
 */
export function getAlignment(placement) {
    //@ts-ignore
    return placement.split("-")[1];
}

/**
 * @param {Placement} placement
 * @returns {Axis}
 */
export function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}

/**
 * @param {Axis} axis
 * @returns {Length}
 */
export function getLengthFromAxis(axis) {
    return axis === "y" ? "height" : "width";
}

/**
 * @param {Side|string} side
 * @returns {Side}
 */
export function flipSide(side) {
    if (side === "top") {
        return "bottom";
    }
    if (side === "bottom") {
        return "top";
    }
    if (side === "left") {
        return "right";
    }
    if (side === "right") {
        return "left";
    }
}

/**
 * @param {Coords} coords
 * @param {Side} side
 * @param {Number} offset
 * @param {Boolean} rtl
 */
export function applyOffset(coords, side, offset, rtl = false) {
    switch (side) {
        case "top":
            coords.y -= offset;
            break;
        case "bottom":
            coords.y += offset;
            break;
        case "left":
            coords.x += rtl ? offset : -offset;
            break;
        case "right":
            coords.x += rtl ? -offset : offset;
            break;
        default:
            console.warn(`Invalid side ${side}`);
    }
}

/**
 * @link https://github.com/floating-ui/floating-ui/blob/master/packages/core/src/computeCoordsFromPlacement.ts
 * @param {DOMRect} reference
 * @param {DOMRect} floating
 * @param {Placement} placement
 * @param {Boolean} rtl
 * @returns {Coords}
 */
export function computeCoordsFromPlacement(reference, floating, placement, rtl = false) {
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === "x";

    let coords;
    switch (side) {
        case "top":
            coords = { x: commonX, y: reference.y - floating.height };
            break;
        case "bottom":
            coords = { x: commonX, y: reference.y + reference.height };
            break;
        case "right":
            coords = { x: reference.x + reference.width, y: commonY };
            break;
        case "left":
            coords = { x: reference.x - floating.width, y: commonY };
            break;
        default:
            coords = { x: reference.x, y: reference.y };
    }

    switch (getAlignment(placement)) {
        case "start":
            coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
            break;
        case "end":
            coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
            break;
    }

    return coords;
}

/**
 * @param {HTMLElement} el
 * @returns {Function} a function to remove from the list
 */
export function autoUpdate(el) {
    elements.add(el);
    return () => {
        elements.delete(el);
    };
}

/**
 * @param {HTMLElement} referenceEl
 * @param {HTMLElement} floatingEl
 * @param {FloatingConfig} config
 */
export function reposition(referenceEl, floatingEl, config = {}) {
    // The element is not visible, skip
    if (floatingEl.style.display === "none" || floatingEl.style.visibility === "hidden") {
        return;
    }

    const rects = referenceEl.getClientRects();
    const floating = floatingEl.getBoundingClientRect();
    const rtl = isRTL(referenceEl);
    /** @type {Placement} */
    //@ts-ignore
    let placement = config.placement || "bottom";
    const distance = config.distance || 0;
    const flip = config.flip || false;
    let side = getSide(placement);
    const alignement = getAlignment(placement);
    let axis = getMainAxisFromPlacement(placement);

    // this is better than getBoundingClientRect because if reference
    // spawns on multiple line, bounding box may be incorrect
    const reference = placement === "bottom" ? rects[rects.length - 1] : rects[0];

    // Avoid issue if somehow we cannot compute DOMRect
    if (!reference) {
        return;
    }
    const doc = getDocEl(referenceEl.ownerDocument);

    // clientWidth = excluding scrollbar
    let clientWidth = doc.clientWidth;
    let clientHeight = doc.clientHeight;

    // on mobile, having a viewport larger than 100% can make window.innerX very different than doc.clientX
    const checkViewportWidth = window.innerWidth - clientWidth;
    if (checkViewportWidth > 20) {
        clientWidth = window.innerWidth;
        clientHeight = window.innerHeight;
    }
    let startX = 0;
    let startY = 0;

    // Scoped to element
    const scope = config.scopeEl;
    if (scope) {
        const bounds = scope.getBoundingClientRect();
        startX = bounds.x;
        startY = bounds.y;
        clientWidth = bounds.x + bounds.width;
        clientHeight = bounds.y + bounds.height;
    }

    let coords = computeCoordsFromPlacement(reference, floating, placement, rtl);
    const offset = toInt(`${distance}`);
    applyOffset(coords, side, offset, rtl);

    const viewportMargin = 128;

    // Flip if it overflows on axis
    if (flip) {
        let placementChanged = false;

        const cx = Math.ceil(coords.x);
        const cy = Math.ceil(coords.y);

        if (axis === "x" && (cy < startY || cy + floating.height >= clientHeight)) {
            if (cy < startY && cy >= clientHeight) {
                floatingEl.style.maxHeight = "90vh";
            } else if (floating.height <= clientHeight - viewportMargin) {
                // only flip if the floating element can fit in viewport, otherwise keep base direction
                side = flipSide(side);
                placementChanged = true;
            }
        }
        if (axis === "y" && (cx < startX || cx + floating.width >= clientWidth)) {
            if (cx < startX && cx >= clientWidth) {
                floatingEl.style.maxWidth = "90vw";
            } else {
                side = flipSide(side);
                placementChanged = true;
            }
        }
        // If there is not much space at all in the viewport, then it's better to use top/bottom
        if (axis === "y" && doc.clientWidth - floating.width < viewportMargin) {
            side = "top";
            axis = "x";
            placementChanged = true;
        }
        if (placementChanged) {
            // apply flipping
            placement = alignement ? `${side}-${alignement}` : side;
            coords = computeCoordsFromPlacement(reference, floating, placement, rtl);

            // take into consideration that a negative x will be shifted
            const shiftedX = coords.x > 0 ? coords.x : 0;

            // despite flipping, it's outside of bounds again or collides with element
            const outsideX = axis === "x" && coords.y + floating.height > doc.clientHeight;
            const outsideY = axis === "y" && coords.x + floating.width > doc.clientWidth;
            const collidesY = axis === "y" && shiftedX + floating.width > reference.left;

            if (outsideX || outsideY || collidesY) {
                // use top placement
                side = "top";
                axis = "x";
                placement = alignement ? `${side}-${alignement}` : side;
                coords = computeCoordsFromPlacement(reference, floating, placement, rtl);
            }

            applyOffset(coords, side, offset, rtl);
        }
    }

    // Shift if it overflows on x axis (on y axis, we only flip)
    // Automatic if floating is larger than anchor
    let totalShift = 0;
    let p = 50;
    if (config.shift || floating.width > reference.width) {
        let dir = 1;
        if (coords.x < startX) {
            totalShift = coords.x - startX + config.shiftPadding;
            coords.x = startX + config.shiftPadding;
        } else if (coords.x + floating.width > clientWidth) {
            totalShift = clientWidth - (coords.x + floating.width) - config.shiftPadding;
            if (totalShift + coords.x < 0) {
                totalShift -= coords.x + totalShift;
            }
            coords.x += totalShift;
            dir = totalShift < 0 ? -1 : 1;
        }
        const shiftPercentage = totalShift !== 0 ? (totalShift / floating.width) * 100 * dir : 0;
        p = 50 + shiftPercentage;
    }
    // Adjust arrow positioning variable
    setCssVar(floatingEl, "p", `${p}%`);

    // Store as data attribute, useful for styling
    floatingEl.dataset.placement = placement;

    // Position floating element
    Object.assign(floatingEl.style, {
        left: `${coords.x}px`,
        top: `${coords.y}px`,
    });
}
