import { on, off } from "./utils/events.js";
import { normalize, slugify } from "./utils/str.js";
import dynamicBehaviour from "./dynamicBehaviour.js";
import { hasAttr } from "./utils/attrs.js";
import { toFloat } from "./utils/misc.js";

function isToken(v) {
    return ["*", "a", "9"].includes(v);
}

const eventHandler = (ev) => {
    const el = ev.target;
    const data = el.dataset;
    const limited = data.limited;
    if (!limited) {
        return;
    }

    let cv = el.value;
    for (const limitation of limited.split("|")) {
        if (limitation === "lower") {
            cv = cv.toLocaleLowerCase();
        } else if (limitation === "upper") {
            cv = cv.toLocaleUpperCase();
        } else if (limitation === "normalize") {
            cv = normalize(cv);
        } else if (limitation === "slug") {
            cv = slugify(cv);
        } else if (limitation === "numeric" || limitation === "currency") {
            // This has the side benefit of "jumping" back to decimal when typing a new .
            cv = cv
                .replace(/,/g, ".")
                .replace(/[^0-9.]/g, "")
                .replace(/\..*\./g, ".");

            // With currency, limit to two decimals
            if (limitation === "currency" && cv.includes(".") && !cv.endsWith(".")) {
                const decimals = Math.min(cv.split(".")[1].length, 2);
                const mul = decimals * 10;
                // don't use toFixed, as typing "6" would round up the decimals
                cv = Math.floor(toFloat(cv) * mul) / mul;
            }
        } else if (limitation === "int") {
            cv = cv.replace(/[^0-9]/g, "");
        } else if (limitation === "alpha") {
            cv = cv.replace(/[^a-zA-Z]/g, "");
        } else if (limitation === "chars") {
            cv = cv.replace(/[^\p{L}]/u, "");
        } else if (limitation === "mask") {
            const mask = data.mask;
            if (mask) {
                const arr = mask.split("");
                const src = cv.split("");
                let i = 0;
                let val = "";
                let token = arr[i];
                const dir = ev && ev.inputType === "insertText" ? 1 : -1;

                // Simple mask : check each char one by one and it's corresponding mask element
                while (token && i < src.length) {
                    const v = src[i];

                    if (token === v) {
                        val += v; // Exact match
                    } else if (token === "*") {
                        val += v;
                    } else if (token === "a" && /^\p{L}/u.test(v)) {
                        val += v;
                    } else if (token === "9" && /^\d$/.test(v)) {
                        val += v;
                    } else {
                        break;
                    }
                    i++;
                    token = arr[i];
                }

                // Is there one or two fixed mask element to add ?
                const nv = arr[i];
                // Append last if not token when going forward
                if (dir === 1 && nv && !isToken(nv)) {
                    val += nv;

                    // Append extra token if needed
                    const nv2 = arr[i + 1];
                    if (nv2 && !isToken(nv2)) {
                        val += nv2;
                    }
                }

                // Remove extra token if needed
                if (dir === -1 && nv && !isToken(nv)) {
                    const nv2 = arr[i - 1];
                    if (nv2 && !isToken(nv2)) {
                        val = val.substring(0, i - 1);
                    }
                }

                cv = val;
            }
        } else if (limitation === "regex") {
            const c = data.regex;
            // if we use unicode ranges, don't forget to add flag
            const flags = c.includes("{") ? "ug" : "g";
            // replace anything that doesn't match the regex
            const regex = new RegExp(`[^${c} + "]`, flags);
            const replace = data.replace || "";
            cv = cv.replace(regex, replace);
        } else if (limitation === "time") {
            const parts = cv.split(":");
            if (parts[0] && parts[0] > 24) {
                parts[0] = 24;
            }
            if (parts[1] && parts[1] > 60) {
                parts[1] = 60;
            }
            cv = parts.join(":");
        }
    }

    // Update value
    el.value = cv;
};

dynamicBehaviour(
    "input[data-limited]",
    /**
     * @param {HTMLInputElement} el
     */
    (el) => {
        // autoset size
        if (el.dataset.limited.includes("mask") && !hasAttr(el, "size")) {
            el.size = el.dataset.mask.length;
        }
        on("input", eventHandler, el);
    },
    /**
     * @param {HTMLInputElement} el
     */
    (el) => {
        off("input", eventHandler, el);
    },
);
