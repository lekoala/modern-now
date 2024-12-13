import { getAttr, getData, getMixedBoolData } from "./utils/attrs.js";
import { dataAsConfig, getDocLang, observeAttrs, simpleConfig } from "./utils/misc.js";
import dynamicBehaviour from "./dynamicBehaviour.js";
import { getAndRun } from "./utils/map.js";

/**
 * @param {HTMLElement} el
 */
function renderNumber(el) {
    const config = simpleConfig(getData(el, "numberConfig"));
    const v = getAttr(el, "data-number");

    // no prefix
    dataAsConfig(el, config, ["currency", "unit"]);
    const lang = getAttr(el, "lang") || getDocLang();
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
    for (const o in el.dataset) {
        if (["value", "currency", "unit"].includes(o)) {
            continue;
        }
        options[o] = getMixedBoolData(el, o);
    }
    const formatter = new Intl.NumberFormat(lang, options);
    const nv = Number(v);
    el.innerText = Number.isNaN(nv) ? "" : formatter.format(nv);
}

/**
 * @type {WeakMap<Element,Function>}
 */
const cleanupMap = new WeakMap();
dynamicBehaviour(
    "span[data-number]",
    (el) => {
        renderNumber(el);
        cleanupMap.set(
            el,
            observeAttrs(el, ["data-number"], (node, oldValue) => {
                renderNumber(node);
            }),
        );
    },
    (el) => {
        getAndRun(cleanupMap, el);
    },
);
