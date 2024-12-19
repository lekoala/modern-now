import { on, off } from "./utils/events.js";
import { normalize, slugify } from "./utils/str.js";
import dynamicBehaviour from "./dynamicBehaviour.js";

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
        } else if (limitation === "numeric") {
            cv = cv.replace(",", ".").replace(/[^0-9.]/g, "");
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

                const nv = arr[i];
                // Append last if not token when going forward
                if (dir === 1 && nv && !["*", "a", "9"].includes(nv)) {
                    val += nv;
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
        }
    }

    // Update value
    el.value = cv;
};

dynamicBehaviour(
    "input[data-limited]",
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
