import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { hasNotAttrString, setAttr, removeAttr, setData } from "./utils/attrs.js";
import { autoUpdate, reposition } from "./utils/floating.js";
import { hide, show } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";
import { getAndRun } from "./utils/map.js";

const events = ["click"];
const floatingEvents = ["floatingReposition", "floatingHide"];
const cleanupMap = new WeakMap();

const { HTML } = createRegistry();

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

            // https://meowni.ca/hidden.is.a.lie.html
            this.ariaExpanded = hasNotAttrString(el, "hidden");
            setAttr(this, "aria-controls", data.dropdown);
            el.style.position = "fixed";
            hide(el);
            removeAttr(el, "hidden"); // don't use hidden attribute
            setData(el, {
                dropdownPlacement: placement,
                dropdownDistance: distance,
            });
            cleanupMap.set(el, autoUpdate(el));
            on(events, this);
            on(floatingEvents, this, el);
        }

        disconnectedCallback() {
            off(events, this);
            off(floatingEvents, this.el);
            getAndRun(cleanupMap, this.el);
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
            hide(el);
            this.ariaExpanded = "false";
        }

        /**
         * Targets document
         * @param {KeyboardEvent} ev
         */
        $keydown(ev) {
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
            const el = this.el;
            this.ariaExpanded = this.ariaExpanded === "true" ? "false" : "true";
            if (this.ariaExpanded === "true") {
                show(el);
                dispatch("floatingReposition", el);
                on("keydown", this, document);
            } else {
                hide(el);
                off("keydown", this, document);
            }
        }
    },
);
