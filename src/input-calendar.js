import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { ce, getDocLang, globalContext, injectCss, simpleConfig } from "./utils/misc.js";
import { byId } from "./utils/query.js";
import { parse } from "./dynamicBehaviour.js";
import { dateFormat } from "./utils/date.js";

const css = /*css*/ `
.calendar-dropdown {
    background:#fff;
    padding:1em;
    filter: drop-shadow(5px 5px 10px rgba(0,0,0,0.2));
}
`;
injectCss(css, "input-calendar-styles");

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 256 256">
<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
</svg>`;

let i = 0;

// This input leverages calendar / masked / limited inputs

const { HTML } = createRegistry(globalContext());
define(
    "input[data-calendar]",
    class extends HTML.Input {
        connectedCallback() {
            if (this.type === "hidden") {
                return;
            }

            if (!this.id) {
                i++;
                this.id = `calendar-input-${i}`;
            }
            const id = this.id;
            const lang = this.lang || getDocLang();
            const data = this.dataset;
            const config = Object.assign(
                {
                    lang: lang,
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

            const format = dateFormat(lang);
            const mask = format.replace(/[a-z]/g, "9");

            const holder = ce("div");
            holder.id = `${id}-holder`;
            holder.classList.add("calendar-input-group");
            holder.innerHTML = `
<input type="text" id="${id}-formatted" data-limited="mask" data-mask="${mask}" data-to="${id}" data-to-transform="isoDate" placeholder="${format}" size="10">
<button data-dropdown="${id}-dropdown" data-dropdown-close="outside,.is-date">${icon}</button>
<div id="${id}-dropdown" class="calendar-dropdown" data-dropdown-placement="top-center" hidden>
    <div data-calendar='${JSON.stringify(config)}'></div>
</div>
`;
            this.after(holder);

            // Attach to behaviour
            parse([this]);
        }

        disconnectedCallback() {
            if (this.type !== "hidden") {
                return;
            }
            const holder = byId(`${this.id}-holder`);
            if (holder) {
                holder.remove();
            }
        }
    },
);
