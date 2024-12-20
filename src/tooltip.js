import dynamicBehaviour from "./dynamicBehaviour.js";
import { addClass, getAttr, getBoolData, hasAttr, removeAttr, setAttr, setData } from "./utils/attrs.js";
import { dispatch, off, on } from "./utils/events.js";
import { autoUpdate, reposition, floatingHide, floatingReposition } from "./utils/floating.js";
import { getAndRun } from "./utils/map.js";
import { injectCss, show, hide, ce, isVisible, as, simpleConfig, dataAsConfig, supportsPopover } from "./utils/misc.js";
import { byId } from "./utils/query.js";

/**
 * @typedef TooltipConfig
 * @property {Number} distance Distance in pixels
 * @property {String} placement
 * @property {String} target
 * @property {String} class
 * @property {String} title
 * @property {Boolean} hidden Keep hidden
 * @property {Boolean} visible Keep visible
 * @property {Boolean} click Triggers on click
 */

// see https://css-generators.com/tooltip-speech-bubble/
// cannot use inset as it's only supported in ios > 14 https://caniuse.com/mdn-css_properties_inset
// requires -webkit prefix for clip path
// data-placement is set by floating utils
const css = /*css*/ `
div.tooltip {
  --b: 12px;
  --h: 6px;
  --p: 50%;
  --r: 6px;
  --tooltip-color-start: var(--accent, rgb(139, 59, 210));
  --tooltip-color-end: var(--accent-hover, rgb(47, 30, 152));
  --tooltip-bg: linear-gradient(45deg, var(--tooltip-color-start), var(--tooltip-color-end));
  pointer-events: none;
  user-select: none;
  padding: 0.125em 0.5em;
  color: #fff;
  border-radius: min(var(--r),var(--p) - var(--b)/2) min(var(--r),100% - var(--p) - var(--b)/2) var(--r) var(--r)/var(--r);
  background: 0 0/100% calc(100% + var(--h)) var(--tooltip-bg);
  position: relative;
  overflow: visible;
  inset: unset;
  z-index: 0;
  max-width: max(40ch, 90vw);
  opacity:1;
  font-size: 0.875rem;
  text-wrap: pretty;
}
div.tooltip:before {
  content: " ";
  position: absolute;
  z-index: -1;
  background-image: inherit;
  right: 0px;
  top: 0px;
  left: 0px;
  bottom: 0px;
}
div.tooltip[data-placement="top"]:before {
  bottom: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) calc(100% - var(--h)),var(--p) 100%,max(0%,var(--p) - var(--b)/2) calc(100% - var(--h)),50% 50%);
}
div.tooltip[data-placement="bottom"] {
  background: 0 100%/100% calc(100% + var(--h)) var(--tooltip-bg);
}
div.tooltip[data-placement="bottom"]:before {
  top: calc(-1*var(--h));
  clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
  -webkit-clip-path: polygon(min(100%,var(--p) + var(--b)/2) var(--h),var(--p) 0,max(0%,var(--p) - var(--b)/2) var(--h),50% 50%);
}
div.tooltip[data-placement="right"] {
  background:  0/calc(100% + var(--h)) 100%  var(--tooltip-bg);
}
div.tooltip[data-placement="right"]:before {
  left: calc(-1*var(--h));
  clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(var(--h) max(0%,var(--p) - var(--b)/2),0 var(--p),var(--h) min(100%,var(--p) + var(--b)/2),50% 50%);
}
div.tooltip[data-placement="left"] {
  background: 100%/calc(100% + var(--h)) 100% var(--tooltip-bg);
}
div.tooltip[data-placement="left"]:before {
  right: calc(-1*var(--h));
  clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
  -webkit-clip-path: polygon(calc(100% - var(--h)) max(0%,var(--p) - var(--b)/2),100% var(--p),calc(100% - var(--h)) min(100%,var(--p) + var(--b)/2),50% 50%);
}
`;
const id = "tooltip-style";
injectCss(css, id);

const usePopover = true && supportsPopover();
const events = ["mouseover", "mouseout", "focus", "blur", "click"];
const floatingEvents = [floatingHide, floatingReposition];

function showTooltip(tooltip) {
    if (usePopover) {
        tooltip.showPopover();
    }
    show(tooltip);
    // compute initial position
    dispatch(floatingReposition, tooltip);
}

function hideTooltip(tooltip) {
    if (usePopover) {
        tooltip.hidePopover();
    }
    hide(tooltip);
}

/**
 * This is the event handler for the tooltip trigger
 * @param {MouseEvent} ev
 */
const eventHandler = (ev) => {
    const target = as(ev.target, "div");
    // if the target is already the tooltip trigger, then target = reference
    const reference = as(target.closest("[data-tooltip]"), "a");
    const data = reference.dataset;
    const tooltip = byId(data.tooltipTarget);
    if (!tooltip) {
        return;
    }
    const isClick = ev.type === "click";
    const showOnClick = getBoolData(reference, "tooltipClick");
    const alwaysVisible = getBoolData(reference, "tooltipVisible");
    const keepHidden = getBoolData(reference, "tooltipHidden");
    let action = null;

    if (showOnClick) {
        if (isClick) {
            ev.preventDefault();
            action = isVisible(tooltip) ? "hide" : "show";
        }
    } else if (!isClick) {
        action = ["mouseover", "focus"].includes(ev.type) ? "show" : "hide";
    }
    if (action === "show") {
        if (!keepHidden && !isVisible(tooltip)) {
            showTooltip(tooltip);
        }
    } else if (action === "hide" && !alwaysVisible) {
        // Hide, unless it's focused
        if (document.activeElement !== target || isClick) {
            hideTooltip(tooltip);
        }
    }
};

/**
 * This is the event handler for the tooltip itself
 * @param {Event} ev
 */
const tooltipHandler = (ev) => {
    /** @type {HTMLElement} */
    //@ts-ignore
    const t = ev.target;
    const type = ev.type;
    const d = t.dataset;
    if (type === floatingReposition) {
        const el = byId(d.tooltipElement);
        reposition(el, t, {
            placement: d.tooltipPlacement,
            // Distance should really match the size of the tooltip's arrow (see --r and --h)
            distance: d.tooltipDistance,
            flip: true,
            shift: true,
            shiftPadding: 6,
        });
    }
    if (type === floatingHide && !t.dataset.tooltipVisible) {
        hideTooltip(t);
    }
};

const cleanupMap = new WeakMap();

// tooltips are implemented as dynamic behaviour because it can apply to multiple type of nodes

let i = 0;
dynamicBehaviour(
    "[data-tooltip]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        let tooltip;

        // Shortcut for config
        const data = el.dataset;

        /** @type {TooltipConfig} */
        const config = simpleConfig(data.tooltip);

        // Data shortcut, with a tooltip prefix
        dataAsConfig(el, config, ["distance", "placement", "target", "class", "title", "visible", "hidden"], "tooltip");

        // Persist some useful data attributes for our eventHandler
        if (config.hidden) {
            data.tooltipHidden = "true";
        }
        if (config.visible) {
            data.tooltipVisible = "true";
        }
        if (config.click) {
            data.tooltipClick = "true";
        }

        // use href if no target
        const href = getAttr(el, "href");
        if (!config.target && href && href.indexOf("#") === 0) {
            config.target = href.substring(1);
        }

        const title = config.title || getAttr(el, "title");
        if (title) {
            // create from title attribute
            removeAttr(el, "title");

            i++;
            tooltip = ce("div");
            tooltip.id = `tooltip-${i}`;
            tooltip.style.maxWidth = "40ch";
            tooltip.innerHTML = `${title}`;

            // If we have a popover parent, adding to the body is not an option
            const parent = el.closest("dialog") || document.body;
            parent.appendChild(tooltip);

            data.tooltipTarget = tooltip.id;
        } else if (config.target) {
            // it could be the id of a custom tooltip
            tooltip = byId(config.target);
            data.tooltipTarget = config.target;
        }
        if (!tooltip) {
            return;
        }

        setAttr(el, "aria-describedby", `tooltip-${i}`);
        tooltip.style.position = "fixed";
        if (usePopover) {
            tooltip.popover = "";
        }
        if (!config.visible) {
            hide(tooltip);
        } else {
            tooltip.dataset.tooltipVisible = "true";
        }
        addClass(tooltip, "tooltip");
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tooltip_Role
        tooltip.role = "tooltip";
        // see https://web.dev/articles/building/a-tooltip-component
        tooltip.inert = true;
        tooltip.tabIndex = -1;
        if (config.class) {
            addClass(tooltip, config.class);
        }
        if (!el.id) {
            el.id = `${tooltip.id}-target`;
        }
        setData(tooltip, {
            tooltipPlacement: config.placement || "top",
            tooltipDistance: config.distance || "6",
            tooltipElement: el.id,
        });
        on(floatingEvents, tooltipHandler, tooltip);
        //cleanup is called when element is removed from the dom
        const cleanup = autoUpdate(tooltip);
        cleanupMap.set(tooltip, cleanup);
        on(events, eventHandler, el);

        if (config.visible) {
            showTooltip(tooltip);
        }
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        const tooltip = byId(el.dataset.tooltipTarget);
        if (tooltip) {
            off(floatingEvents, tooltipHandler, tooltip);
            getAndRun(cleanupMap, tooltip);
            tooltip.remove();
        }
        off(events, eventHandler, el);
    },
);
