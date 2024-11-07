import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { hasNotAttrString, setAttr, removeAttr, setData } from "./utils/attrs.js";
import { autoUpdate, floatingHide, floatingReposition, reposition } from "./utils/floating.js";
import { doWithAnimation, globalContext, hide, show } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";
import { getAndRun } from "./utils/map.js";

const events = ["click"];
const floatingEvents = [floatingReposition, floatingHide];
const cleanupMap = new WeakMap();
const openMenus = new Set();

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
        const contains = menu.contains(ev.target);
        if (close === "inside" && contains) {
            continue;
        }
        if (close === "outside" && !contains) {
            continue;
        }
        dispatch(floatingHide, menu);
    }
};
on("click", globalHandler);

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
            const el = this.el;
            openMenus.delete(el);
            hide(el);
            this.ariaExpanded = "false";
        }

        /**
         * Targets document
         * @param {KeyboardEvent} ev
         */
        $keydown(ev) {
            // Multiple menus opened
            if (this.el !== Array.from(openMenus).pop()) {
                return;
            }
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
            }
        }

        /**
         * @param {Number} dir
         */
        selectAdjacentItem(dir) {
            const el = this.el;
            const links = qsa("a", "a", el);
            //@ts-ignore
            const idx = links.indexOf(document.activeElement);
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
            const el = this.el;
            this.ariaExpanded = this.ariaExpanded === "true" ? "false" : "true";
            if (this.ariaExpanded === "true") {
                openMenus.add(el);
                doWithAnimation(el, () => {}, true);
                show(el);
                dispatch(floatingReposition, el);
                on("keydown", this, document);
            } else {
                openMenus.delete(el);
                doWithAnimation(el, () => {
                    hide(el);
                });
                off("keydown", this, document);
            }
        }
    },
);
