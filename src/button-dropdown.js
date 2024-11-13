import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { hasNotAttrString, setAttr, removeAttr, setData } from "./utils/attrs.js";
import { autoUpdate, floatingHide, floatingReposition, reposition } from "./utils/floating.js";
import { activeEl, doWithAnimation, globalContext, hide, isDescendant, show } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";
import { getAndRun } from "./utils/map.js";

const events = ["click"];
const floatingEvents = [floatingReposition, floatingHide];
const docEvents = ["keydown", "keyup"];
const cleanupMap = new WeakMap();
const openMenus = new Set();
let curr;
let lastTrigger;

const globalHandler = (ev) => {
    if (openMenus.size === 0) {
        return;
    }
    for (const menu of openMenus) {
        // https://getbootstrap.com/docs/5.3/components/dropdowns/#auto-close-behavior
        // default | inside | outside | manual
        const close = menu.dataset.dropdownClose;
        if (close === "manual") {
            return;
        }
        const clickInside = menu.contains(ev.target);
        // close = outside, but we clicked outside
        if (close === "outside" && clickInside) {
            continue;
        }
        // close = inside, but we clicked outside
        if (close === "inside" && !clickInside) {
            continue;
        }
        // close = class, but no class is found
        if (close.startsWith(".") && !ev.target.closest(close)) {
            continue;
        }

        dispatch(floatingHide, menu);
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

        $floatingHide(ev) {
            this.ariaExpanded = "false";
            this.hideMenu();
        }

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
            this.ariaExpanded = "true";
            const el = this.el;
            openMenus.add(el);
            curr = el;
            doWithAnimation(el, () => {}, true);
            show(el);
            dispatch(floatingReposition, el);
            on(docEvents, this, document);
        }

        hideMenu() {
            this.ariaExpanded = "false";
            const el = this.el;
            openMenus.delete(el);
            if (curr === el) {
                curr = getLastOpenedMenu();
                if (curr && lastTrigger) {
                    lastTrigger.focus(); // restore focus
                }
            }
            doWithAnimation(el, () => {
                hide(el);
            });
            off(docEvents, this, document);
        }
    },
);
