import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { hasNotAttrString, setAttr, removeAttr, setData, addClass, removeClass } from "./utils/attrs.js";
import { autoUpdate, floatingHide, floatingReposition, reposition } from "./utils/floating.js";
import { activeEl, doWithAnimation, globalContext, hide, show } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";
import { getAndRun } from "./utils/map.js";

const isOpened = "is-opened";
const events = ["click"];
const floatingEvents = [floatingReposition, floatingHide];
const docEvents = ["keydown", "keyup"];
/**
 * @type {WeakMap<Element,Function>}
 */
const cleanupMap = new WeakMap();
const openMenus = new Set();
let curr;
let lastTrigger;

/**
 * This is called on click on document
 * @param {MouseEvent} ev
 * @returns {void}
 */
const globalHandler = (ev) => {
    if (openMenus.size === 0) {
        return;
    }
    for (const menu of openMenus) {
        // https://getbootstrap.com/docs/5.3/components/dropdowns/#auto-close-behavior
        // default | inside | outside | manual | .selector | outside,.selector
        const closeArr = menu.dataset.dropdownClose.split(",");

        let n = null;
        for (const close of closeArr) {
            if (close === "outside" || close === "inside") {
                // This works better than menu.contains(ev.target) because if the node is rerendered, it will not be there anymore
                const clickInside = Array.from(ev.composedPath()).includes(menu);
                if (close === "outside" && !clickInside) {
                    n = "outside";
                }
                if (close === "inside" && clickInside) {
                    n = "inside";
                }
            }
            //@ts-ignore
            if (close.startsWith(".") && ev.target.closest(close)) {
                n = "selector";
            }
        }
        if (n) {
            dispatch(floatingHide, menu);
        }
    }
};
on("click", globalHandler);

function getLastOpenedMenu() {
    return Array.from(openMenus).pop();
}

const { HTML } = createRegistry(globalContext());
define(
    "button[data-dropdown]",
    class extends HTML.Button {
        get el() {
            return byId(this.dataset.dropdown);
        }

        connectedCallback() {
            const el = this.el;
            if (!el) {
                console.error(`Element does not exist: ${this.dataset.dropdown}`);
                return;
            }
            const data = this.dataset;
            const elData = el.dataset;

            // Options can be defined on the button or on the menu
            const placement = data.dropdownPlacement || elData.dropdownPlacement || "bottom-start";
            const distance = data.dropdownDistance || elData.dropdownDistance || 6;
            const close = data.dropdownClose || elData.dropdownClose || "default";

            // https://meowni.ca/hidden.is.a.lie.html
            this.ariaExpanded = hasNotAttrString(el, "hidden");
            setAttr(this, "aria-controls", data.dropdown);
            el.style.position = "fixed";
            hide(el);
            removeAttr(el, "hidden"); // don't use hidden attribute
            setData(el, {
                dropdown: "true",
                dropdownPlacement: placement,
                dropdownDistance: distance,
                dropdownClose: close,
            });
            cleanupMap.set(el, autoUpdate(el));
            on(events, this);
            on(floatingEvents, this, el);
        }

        disconnectedCallback() {
            const el = this.el;
            off(events, this);
            off(floatingEvents, this, el);
            getAndRun(cleanupMap, el);
            openMenus.delete(el);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        /**
         * @param {Event} ev
         */
        $floatingReposition(ev) {
            const el = this.el;
            const d = el.dataset;
            reposition(this, el, {
                placement: d.dropdownPlacement,
                distance: d.dropdownDistance,
                flip: true,
                shift: true,
                shiftPadding: 6,
            });
        }

        /**
         * @param {Event} ev
         */
        $floatingHide(ev) {
            this.hideMenu();
        }

        /**
         * @param {KeyboardEvent} ev
         */
        $keyup(ev) {
            // When tabbing, we might change menu
            if (ev.key === "Tab") {
                const ac = activeEl();
                if (ac) {
                    curr = ac.closest('[data-dropdown="true"]');
                }
            }
        }

        /**
         * Targets document
         * @param {KeyboardEvent} ev
         */
        $keydown(ev) {
            // Multiple menus opened
            if (this.el !== curr) {
                return;
            }
            const ac = activeEl();

            // esc is handled by reposition util
            switch (ev.key) {
                case "ArrowDown":
                    ev.preventDefault();
                    this.selectAdjacentItem(+1);
                    break;
                case "ArrowUp":
                    ev.preventDefault();
                    this.selectAdjacentItem(-1);
                    break;
                case "ArrowRight":
                    if (ac && ac.tagName === "BUTTON") {
                        dispatch("click", ac);
                    }
                    break;
                case "ArrowLeft":
                    this.hideMenu();
                    break;
            }
        }

        /**
         * @param {Number} dir
         */
        selectAdjacentItem(dir) {
            const el = this.el;
            const scope = el.tagName === "UL" ? ":scope > li" : ":scope";
            const links = qsa(`${scope} > a, ${scope} > button`, "a", el);
            //@ts-ignore
            const idx = links.indexOf(activeEl());
            let offset = dir;
            if (idx + dir >= links.length) {
                offset = 0;
            }
            const next = links[idx + offset] || links[0];
            next.focus();
        }

        /**
         * @param {MouseEvent} ev
         */
        $click(ev) {
            ev.stopPropagation(); // Don't trigger global handler
            if (this.ariaExpanded === "false") {
                this.showMenu();
                lastTrigger = this;
            } else {
                this.hideMenu();
            }
        }

        showMenu() {
            if (this.ariaExpanded === "true") {
                return;
            }
            this.ariaExpanded = "true";
            const el = this.el;
            // is-open class acts pretty much like the [open] attribute for a dialog
            addClass(el, isOpened);
            openMenus.add(el);
            curr = el;
            show(el);
            dispatch(floatingReposition, el);
            doWithAnimation(el, () => {}, true);
            on(docEvents, this, document);
        }

        hideMenu() {
            if (this.ariaExpanded === "false") {
                return;
            }
            const el = this.el;
            removeClass(el, isOpened);
            openMenus.delete(el);
            if (curr === el) {
                curr = getLastOpenedMenu();
                if (curr && lastTrigger) {
                    lastTrigger.focus(); // restore focus
                }
            }
            doWithAnimation(
                el,
                () => {
                    hide(el);
                    this.ariaExpanded = "false";
                },
                false,
            );
            off(docEvents, this, document);
        }
    },
);
