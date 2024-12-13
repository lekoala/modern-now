import { getAttr, getBoolData, getData, getMixedBoolData } from "./utils/attrs.js";
import {
    hasTime,
    hasDate,
    asDate,
    toDate,
    toDateTime,
    toTime,
    dateRanges,
    expandDateTime,
    toIsoDateTime,
    supportsRelativeTime,
} from "./utils/date.js";
import { getDocEl, getDocLang, observeAttrs, simpleConfig } from "./utils/misc.js";
import dynamicBehaviour from "./dynamicBehaviour.js";
import { getAndRun } from "./utils/map.js";

/**
 * @param {HTMLTimeElement} el
 */
function renderDateTime(el) {
    if (!el.dataset.render) {
        return;
    }
    const config = simpleConfig(getData(el, "datetimeConfig"));
    const dt = getAttr(el, "datetime");
    const style = getData(el, "style"); // short, medium, long, full
    const format = getData(el, "format");
    const relative = getBoolData(el, "relative");
    const lang = getAttr(el, "lang") || getDocLang();
    const options = config;
    // Style shortcut
    if (hasTime(dt) && !options.timeStyle) {
        options.timeStyle = style || "short";
    }
    if (hasDate(dt) && !options.dateStyle) {
        options.dateStyle = style || "short";
    }
    // Allow passing arbitrary data variables to options
    let customDate = false;
    let customTime = false;
    for (const o in el.dataset) {
        if (["style", "format", "relative", "render"].includes(o)) {
            continue;
        }
        if (["year", "month", "day"].includes(o)) {
            customDate = true;
        }
        if (["hour", "minute", "second"].includes(o)) {
            customTime = true;
        }
        options[o] = getMixedBoolData(el, o);
    }
    // Not compatible with time/date style
    if (customDate && options.dateStyle) {
        options.dateStyle = undefined;
    }
    if (customTime && options.timeStyle) {
        options.timeStyle = undefined;
    }
    let f = "";

    const d = asDate(dt);
    switch (format) {
        case "iso":
            f = d.toISOString();
            break;
        case "utc":
            f = d.toUTCString();
            break;
        case "datetime":
            f = toDateTime(d);
            break;
        case "date":
            f = toDate(d);
            break;
        case "time":
            f = toTime(d);
            break;
        default:
            if (relative) {
                const ranges = dateRanges();
                const secondsElapsed = (d.getTime() - Date.now()) / 1000;
                for (const key in ranges) {
                    if (ranges[key] < Math.abs(secondsElapsed)) {
                        const delta = secondsElapsed / ranges[key];

                        if (supportsRelativeTime()) {
                            //@ts-ignore
                            f = new Intl.RelativeTimeFormat(lang).format(Math.round(delta), key);
                        } else {
                            // This is a very crude polyfill that only works in english
                            const v = Math.abs(Math.floor(delta));
                            const u = v === 1 ? key.replace(/s$/, "") : key;
                            f = `${v} ${u}`;
                        }

                        break;
                    }
                }
            } else {
                //@ts-ignore
                try {
                    // IOS is very sensitive, always use proper iso format
                    const dateObj = Date.parse(toIsoDateTime(expandDateTime(dt)));

                    f = new Intl.DateTimeFormat(lang, options).format(dateObj);
                } catch (error) {
                    el.dataset.error = error;
                }
            }

            break;
    }
    if (f.length > 0) {
        el.innerText = f;
    }
}

/**
 * @type {WeakMap<Element,Function>}
 */
const cleanupMap = new WeakMap();

dynamicBehaviour(
    "time[datetime]",
    /**
     * @param {HTMLTimeElement} el
     */
    (el) => {
        const dt = getAttr(el, "datetime");

        // it could be populated server side
        // elements need a "render" data attribute to by dynamically populated
        if (dt && !el.innerText.trim()) {
            el.dataset.render = "true";
        }

        renderDateTime(el);
        cleanupMap.set(
            el,
            observeAttrs(el, ["datetime"], (node, oldValue) => {
                renderDateTime(node);
            }),
        );
    },
    (el) => {
        getAndRun(cleanupMap, el);
    },
);
