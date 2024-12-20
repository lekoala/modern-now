import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { as, ce, getDocLang, globalContext, simpleConfig } from "./utils/misc.js";
import { byId, qs } from "./utils/query.js";
import { parse } from "./dynamicBehaviour.js";
import { dateFormat, dateToIsoFormat, dateToLocalFormat, expandDate } from "./utils/date.js";
import { dispatch, off, on } from "./utils/events.js";

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>`;

let i = 0;

// This input leverages calendar / masked / limited inputs

const { HTML } = createRegistry(globalContext());
define(
    "input[data-calendar]",
    class extends HTML.Input {
        static observedAttributes = ["value"];
        connectedCallback() {
            if (this.type === "hidden") {
                return;
            }

            if (!this.id) {
                i++;
                this.id = `calendar-input-${i}`;
            }
            if (!this.lang) {
                this.lang = getDocLang();
            }
            const disabled = this.disabled;
            const readonly = this.readOnly;
            const value = this.value;
            const name = this.name;
            const id = this.id;
            const data = this.dataset;
            const config = Object.assign(
                {
                    lang: this.lang,
                    controls: true,
                    click: id,
                    tableClass: "calendar-table",
                },
                simpleConfig(data.calendar),
            );

            // data-to="calendar-input-fmt" data-to-transform="localDate"
            this.dataset.to = `${id}-formatted`;
            this.dataset.toTransform = "localDate";
            this.type = "hidden";

            const format = dateFormat(this.lang);
            const mask = format.replace(/[a-z]/g, "9");

            let attrs = "";
            if (disabled) {
                attrs += " disabled";
            }
            if (readonly) {
                attrs += " readonly";
            }
            let btnAttrs = "";
            if (disabled || readonly) {
                btnAttrs += " disabled";
            }

            const val = value ? dateToLocalFormat(expandDate(value), this.lang) : "";

            const holder = ce("div");
            holder.id = `${id}-holder`;
            holder.classList.add("calendar-input-group");
            holder.innerHTML = `<input type="text" id="${id}-formatted" name="_${name || id}" value="${val}" data-limited="mask" data-mask="${mask}" data-to="${id}" data-to-transform="isoDate" placeholder="${format}" size="${mask.length}" inputmode="numeric"${attrs}>
<button data-dropdown="${id}-dropdown" data-dropdown-close="outside,.is-date"${btnAttrs}>${icon}</button>
<div id="${id}-dropdown" class="calendar-dropdown" data-dropdown-placement="top-center" hidden>
    <div data-calendar='${JSON.stringify(config)}' data-value="${value}"></div>
</div>`;
            this.after(holder);

            const input = byId(`${this.id}-formatted`);
            on("input", this);
            on("input", this, input);

            // Attach [data-to] behaviour
            parse([this]);
        }

        handleEvent(ev) {
            const t = as(ev.target, "input");
            // Input can come from formatted or hidden input
            if (t.name.startsWith("_")) {
                const max = t.size;
                const signMax = t.dataset.mask.replace(/\.$/, "").length;
                if (t.value.length < signMax) {
                    this.value = "";
                    return;
                }
                t.value = t.value.substring(0, max); // avoid input overflow

                this.value = dateToIsoFormat(t.value, this.lang);
            } else {
                if (this.value.length < 10) {
                    return;
                }
                this.value = this.value.substring(0, 10); // avoid input overflow
                const input = byId(`${this.id}-formatted`, "input");
                input.value = dateToLocalFormat(this.value, this.lang, "yyyy-mm-dd");
            }
            // Update calendar in dropdown
            const holder = byId(`${this.id}-holder`);
            qs("[data-calendar]", "div", holder).dataset.value = this.value;
        }

        disconnectedCallback() {
            off("input", this);
            const input = byId(`${this.id}-formatted`);
            if (input) {
                off("input", this, input);
            }
            if (this.type !== "hidden") {
                return;
            }
            const holder = byId(`${this.id}-holder`);
            if (holder) {
                holder.remove();
            }
        }

        attributeChangedCallback(name, before, now) {
            if (this.type !== "hidden") {
                return;
            }
            // If the value of the hidden input has been changed, reflect in ui
            if (before !== now && now.length >= 10) {
                dispatch("input", this);
            }
        }
    },
);
