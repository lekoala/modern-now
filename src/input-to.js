import { on, off, dispatch } from "./utils/events.js";
import { byId } from "./utils/query.js";
import { dotPath, getDocEl, getDocLang } from "./utils/misc.js";
import dynamicBehaviour from "./dynamicBehaviour.js";
import { dateToLocalFormat, dateToIsoFormat } from "./utils/date.js";
import { getAttr } from "./utils/attrs.js";

let isHandlingTo = false;

const eventHandler = (ev) => {
    const el = ev.target;
    const data = el.dataset;
    const to = data.to;
    if (!to) {
        return;
    }
    const toEl = byId(to, "input");
    if (!toEl) {
        return;
    }
    // Allows mutual data-to inputs
    if (isHandlingTo) {
        return;
    }
    isHandlingTo = true;
    let v = el.value;
    const t = data.toTransform;
    if (t) {
        const lang = getAttr(el, "lang") || getDocLang();
        // We have some built in date conversion, otherwise it can be a custom fn
        if (t === "localDate") {
            v = dateToLocalFormat(v, lang);
        } else if (t === "isoDate") {
            v = dateToIsoFormat(v, lang);
        } else {
            const fn = dotPath(t);
            if (fn) {
                v = fn(v);
            }
        }
    }

    toEl.value = v;
    dispatch("input", toEl);
    isHandlingTo = false;
};

dynamicBehaviour(
    "input[data-to]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        on("input", eventHandler, el);
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        off("input", eventHandler, el);
    },
);
