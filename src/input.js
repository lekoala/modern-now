import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off, dispatch } from "./utils/events.js";
import { getAttr } from "./utils/attrs.js";
import { byId } from "./utils/query.js";
import { normalize, slugify } from "./utils/str.js";
import { dotPath, globalContext } from "./utils/misc.js";

let isHandlingTo = false;

const { HTML } = createRegistry(globalContext());
define(
    "input[data-to],input[data-limited]",
    class extends HTML.Input {
        connectedCallback() {
            on("input", this);
        }

        disconnectedCallback() {
            off("input", this);
        }

        handleTo(ev) {
            const to = this.dataset.to;
            if (!to) {
                return;
            }
            const el = byId(to, "input");
            if (el) {
                // Allows mutual data-to inputs
                if (isHandlingTo) {
                    return;
                }
                isHandlingTo = true;
                let v = this.value;
                const t = this.dataset.toTransform;
                if (t) {
                    // We have some built in date conversion, otherwise it can be a custom fn
                    if (t === "dmy") {
                        v = v.split("-").reverse().join("/");
                    } else if (t === "ymd") {
                        v = v.split("/").reverse().join("-");
                    } else {
                        const fn = dotPath(t);
                        if (fn) {
                            v = fn(v);
                        }
                    }
                }

                el.value = v;
                dispatch("input", el);
                isHandlingTo = false;
            }
        }

        handleLimited(ev) {
            const limited = this.dataset.limited;
            if (!limited) {
                return;
            }

            let cv = this.value;
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
                    const mask = getAttr(this, "data-mask");
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
                    const c = this.dataset.regex;
                    // if we use unicode ranges, don't forget to add flag
                    const flags = c.includes("{") ? "ug" : "g";
                    // replace anything that doesn't match the regex
                    const regex = new RegExp(`[^${c} + "]`, flags);
                    const replace = this.dataset.replace || "";
                    cv = cv.replace(regex, replace);
                }
            }

            // Update value
            this.value = cv;
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $input(ev) {
            this.handleTo(ev);
            this.handleLimited(ev);
        }
    },
);
