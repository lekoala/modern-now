import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { getAttr, getData, getMixedBoolData, hasAttr, hasData } from "./utils/attrs.js";
import { dataAsConfig, globalContext, simpleConfig } from "./utils/misc.js";

const { HTML } = createRegistry(globalContext());
define(
    "span[data-number]",
    class extends HTML.Span {
        static observedAttributes = ["data-number"];

        constructor(...args) {
            //@ts-ignore
            super(...args);
            this.render();
        }

        attributeChangedCallback(attr, v) {
            this.render();
        }

        render() {
            const config = simpleConfig(getData(this, "numberConfig"));
            const v = getAttr(this, "data-number");

            // no prefix
            dataAsConfig(this, config, ["currency", "unit"]);
            const lang = getAttr(this, "lang") || getAttr(document.documentElement, "lang") || "en";
            const options = new Intl.NumberFormat().resolvedOptions();
            // Shortcuts
            if (config.currency) {
                options.currency = config.currency;
                options.style = "currency"; // set style automatically
            }
            if (config.unit) {
                options.unit = config.unit;
                options.style = "unit"; // set style automatically
            }
            // Use config
            for (const [k, v] of Object.entries(config)) {
                options[k] = v;
            }
            // Allow passing arbitrary data variables to options
            for (const o in this.dataset) {
                if (["value", "currency", "unit"].includes(o)) {
                    continue;
                }
                options[o] = getMixedBoolData(this, o);
            }
            const formatter = new Intl.NumberFormat(lang, options);
            const nv = Number(v);
            this.innerText = Number.isNaN(nv) ? "" : formatter.format(nv);
        }
    },
);
