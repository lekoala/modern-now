import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
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
import { simpleConfig, toInt } from "./utils/misc.js";

const { HTML } = createRegistry();
define(
    "time[datetime]",
    class extends HTML.Time {
        static observedAttributes = ["datetime"];

        constructor(...args) {
            //@ts-ignore
            super(...args);

            const dt = getAttr(this, "datetime");
            // it could be populated server side
            if (dt && !this.innerText.trim()) {
                this.dataset.render = "true";
            }
            this.renderDatetime();
        }

        attributeChangedCallback(attr, v) {
            this.renderDatetime();
        }

        renderDatetime() {
            if (!this.dataset.render) {
                return;
            }
            const config = simpleConfig(getData(this, "datetimeConfig"));
            const dt = getAttr(this, "datetime");
            const style = getData(this, "style"); // short, medium, long, full
            const format = getData(this, "format");
            const relative = getBoolData(this, "relative");
            const lang = getAttr(this, "lang") || getAttr(document.documentElement, "lang") || "en";
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
            for (const o in this.dataset) {
                if (["style", "format", "relative", "render"].includes(o)) {
                    continue;
                }
                if (["year", "month", "day"].includes(o)) {
                    customDate = true;
                }
                if (["hour", "minute", "second"].includes(o)) {
                    customTime = true;
                }
                options[o] = getMixedBoolData(this, o);
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
                            this.dataset.error = error;
                        }
                    }

                    break;
            }
            if (f.length > 0) {
                this.innerText = f;
            }
        }
    },
);
