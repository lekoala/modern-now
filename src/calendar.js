import dynamicBehaviour from "./dynamicBehaviour.js";
import { getAttr } from "./utils/attrs.js";
import {
    asDate,
    compareDate,
    currentDay,
    currentUTCDay,
    dateComponents,
    dateWithoutTimezone,
    expandDate,
    toDate,
    utcDate,
} from "./utils/date.js";
import { dispatch, off, on } from "./utils/events.js";
import { getAndRun } from "./utils/map.js";
import { dotPath, getDocLang, observeAttrs, simpleConfig, toInt } from "./utils/misc.js";
import { byId } from "./utils/query.js";
import { ucfirst } from "./utils/str.js";

/**
 * @typedef CalendarConfig
 * @property {String} lang
 * @property {Boolean} controls
 * @property {String} tableClass
 * @property {String} click A function reference or an input id
 * @property {Number} firstDay
 * @property {String} minDate
 * @property {String} maxDate
 * @property {Array|Function} enabled
 * @property {Array|Function} disabled
 */

/**
 * @typedef CalendarCellConfig
 * @property {Number} daynum
 * @property {Array} classes
 * @property {string} isodate
 * @property {string} attrs
 * @property {string} btnAttrs
 * @property {string} click
 */

/**
 * @param {String} locale
 * @param {String} month short|long
 * @returns {Array} An array with 12 entries, starting with January
 */
function monthsForLocale(locale = "en-US", month = "short") {
    //@ts-ignore
    const applyFormat = new Intl.DateTimeFormat(locale, { month }).format;
    const months = [...Array(12).keys()];
    return months.map((m) => applyFormat(new Date(Date.UTC(2024, m))));
}

/**
 * @param {String} locale
 * @param {String} weekday short|long
 * @param {Number} firstDay First day (Monday by default = 1)
 * @returns {Array} An array with 7 entries, starting with selected first day
 */
function daysForLocale(locale = "en-US", weekday = "short", firstDay = 1) {
    const now = new Date();
    //@ts-ignore
    const format = new Intl.DateTimeFormat(locale, { weekday }).format;
    const days = [...Array(7).keys()];
    return days.map((day) => format(Date.now() - (now.getDay() - ((day + firstDay) % 7)) * 86400000));
}

/**
 *
 * @param {Date|Number} date
 * @param {String} locale
 * @returns {String}
 */
function formatWithLocale(date, locale = "en-US") {
    return ucfirst(
        new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
        }).format(date),
    );
}

/**
 * @param {String} d
 * @returns {String}
 */
function getYear(d) {
    return d.toString().split("-")[0];
}

/**
 * @param {String} d
 * @returns {String}
 */
function getMonth(d) {
    return d.toString().split("-")[1];
}

/**
 * @param {String} d
 * @returns {String}
 */
function getYearMonth(d) {
    return `${getYear(d)}-${getMonth(d)}`;
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @returns {Date}
 */
function getLastDayOfMonth(year, month) {
    // Set the next month, then 0 (= -1 day)
    return utcDate(year, toInt(month) + 1, 0);
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @returns {Date}
 */
function getLastDayOfPreviousMonth(year, month) {
    // Set the month, then 0 (= -1 day)
    return utcDate(year, toInt(month), 0);
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 * @returns {Date}
 */
function getPreviousMonth(year, month, date = 1) {
    if (month === 0) {
        return utcDate(toInt(year) - 1, 11, date);
    }
    return utcDate(year, toInt(month) - 1, date);
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 * @returns {Date}
 */
function getNextMonth(year, month, date = 1) {
    if (month === 11) {
        return utcDate(toInt(year) + 1, 0, date);
    }
    return utcDate(year, toInt(month) + 1, date);
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 * @returns {Number}
 */
function getDay(year, month, date) {
    return utcDate(year, month, date).getDay();
}

/**
 * @param {String} v
 * @param {String} cls
 * @param {Boolean} disabled
 * @returns {String}
 */
function btn(v, cls = "", disabled = false) {
    const attrs = disabled ? " disabled" : "";
    return `<button type="button" class="${cls}"${attrs} style="min-width:44px">${v}</button>`;
}

/**
 *
 * @param {Number} v
 * @param {String} cls
 * @param {Object} config
 * @returns {String}
 */
function inputNum(v, cls = "", config = {}) {
    let attrs = "";
    if (config.minYear) {
        attrs += ` min="${config.minYear}"`;
    }
    if (config.maxYear) {
        attrs += ` max="${config.maxYear}"`;
    }
    return `<input type="number" class="${cls}" value="${v}" size="4" max="9999" style="max-width:5em;width:auto;"${attrs} />`;
}

/**
 * @param {String} locale
 * @param {Number} v 0-11
 * @param {String} cls
 * @param {Object} config
 * @returns {String}
 */
function monthDrop(locale, v, cls = "", config = {}) {
    const arr = monthsForLocale(locale, "long");
    let min = 0;
    let max = 11;
    if (config.minYear) {
        const miy = toInt(config.minYear);
        if (miy === config.year) {
            min = toInt(config.minMonth) - 1;
        }
        if (miy > config.year) {
            min = 11;
        }
    }
    if (config.maxYear) {
        const may = toInt(config.maxYear);
        if (may === config.year) {
            max = toInt(config.maxMonth) - 1;
        }
        if (may < config.year) {
            max = 0;
        }
    }
    const opts = arr.map((val, idx) => {
        return `<option value="${idx}"${idx === v ? 'selected="selected"' : ""}${idx < min || idx > max ? " disabled" : ""}>${val}</option>`;
    });
    return `<select class="${cls}">${opts}</select>`;
}

/**
 *
 * @param {CalendarCellConfig} c
 * @returns {string}
 */
function tdCell(c) {
    const dayBtn = `<button type="button" class="is-calendar-button"${c.btnAttrs}  style="width:100%;height:100%;">${c.daynum}</button>`;
    return `<td class="${c.classes.join(" ")}" data-date="${c.isodate}"${c.attrs} style="padding:0;height:44px;">${c.click ? dayBtn : c.daynum}</td>`;
}

/**
 * Check if the date is disabled. If so, will update the attributes
 * Checks: min/max date, disabled/enabled config
 * @param {String} isodate
 * @param {CalendarConfig} config
 * @param {String} attrs current attributes
 * @returns {String}
 */
function checkDisabled(isodate, config, attrs = "") {
    let d = false;
    if (config.minDate && compareDate(isodate, config.minDate) < 0) {
        d = true;
    } else if (config.maxDate && compareDate(isodate, config.maxDate) > 0) {
        d = true;
    } else if (Array.isArray(config.disabled) && config.disabled.includes(isodate)) {
        d = true;
    } else if (typeof config.disabled === "function" && config.disabled(asDate(isodate))) {
        d = true;
    } else if (Array.isArray(config.enabled) && config.enabled.length && !config.enabled.includes(isodate)) {
        d = true;
    } else if (typeof config.enabled === "function" && !config.enabled(asDate(isodate))) {
        d = true;
    }
    let a = attrs;
    if (d) {
        a += " disabled";
    }
    return a;
}

/**
 * @param {HTMLElement} elem
 * @returns {CalendarConfig}
 */
function getCalendarConfig(elem) {
    const data = elem.dataset;
    const config = simpleConfig(data.calendar);
    // Expand
    if (config.minDate) {
        config.minDate = expandDate(config.minDate);
    }
    if (config.maxDate) {
        config.maxDate = expandDate(config.maxDate);
    }
    config.enabled = config.enabled || [];
    if (typeof config.enabled === "string") {
        config.enabled = dotPath(config.enabled);
    }
    config.disabled = config.disabled || [];
    if (typeof config.disabled === "string") {
        config.disabled = dotPath(config.disabled);
    }
    return config;
}

/**
 * @param {HTMLElement} node
 * @returns {HTMLDivElement}
 */
function getParentCalendar(node) {
    return node.closest("[data-calendar]");
}

// Some other inspiration here https://github.com/duetds/date-picker/blob/master/src/components/duet-date-picker/date-utils.ts

const cellClickHandler = new WeakMap();

/**
 * @param {string} click
 * @param {HTMLElement} elem
 */
function setClickHandler(click, elem) {
    if (typeof click === "function") {
        cellClickHandler.set(elem, click);
    } else {
        cellClickHandler.set(elem, (node, v) => {
            const input = byId(click, "input");
            if (input) {
                input.value = v;
                dispatch("input", input);
            } else {
                console.error(`${click} not found`);
            }
        });
    }
}

const chevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="m15 18-6-6 6-6"/></svg>`;
const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="m9 18 6-6-6-6"/></svg>`;
const isPrev = "is-prev";
const isNext = "is-next";
const isInactive = "is-inactive";
const isYear = "is-year";
const isMonth = "is-month";
const isDate = "is-date";
const isActive = "is-active";
const isToday = "is-today";

/**
 * Create a calendar for a given year and month
 * @param {HTMLElement} elem
 * @param {Number} year
 * @param {Number} month (from 1 to 12)
 */
function createCalendar(elem, year, month) {
    if (Number.isNaN(month) || Number.isNaN(year)) {
        elem.innerHTML = "Invalid Date";
        return;
    }
    const mon = month - 1; // months in JS are 0..11, not 1..12
    const d = dateWithoutTimezone(utcDate(year, mon, 1));

    // Config
    const config = getCalendarConfig(elem);
    const state = elem.dataset;
    const locale = getAttr(elem, "lang") || config.lang || getDocLang();
    const controls = config.controls;
    const click = config.click;
    const tableClass = config.tableClass || "";

    // Click can be a function or a given input like element
    if (click) {
        setClickHandler(click, elem);
    }

    // Create our variables
    const firstDay = toInt(config.firstDay || 1); // Sunday = 0, Monday = 1 ... Saturday = 6
    const lastWeekDay = firstDay === 0 ? 6 : firstDay - 1;

    // Current date, regardless of timezone
    const today = currentUTCDay();

    const thisDate = today.getDate();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const stateValue = state.value ? state.value.toString() : toDate(currentDay());
    const valueDate = asDate(stateValue);
    const activeDate = stateValue.length <= 7 ? 0 : valueDate.getDate();
    const activeMonth = valueDate.getMonth();
    const activeYear = valueDate.getFullYear();

    // Get the first day of the month
    const dayOne = d.getDay();

    // Get the last date of the month
    const lastDate = getLastDayOfMonth(year, mon).getDate();

    // Get the day of the last date of the month
    const dayend = getDay(year, mon, lastDate);

    // Get the last date of the previous month (date 0 = last day of prev month)
    const lastMonth = getLastDayOfPreviousMonth(year, mon);
    const lastMonthDate = lastMonth.getDate();
    const nextMonth = getNextMonth(year, mon);

    // Check if given date is valid
    const isMin = config.minDate ? compareDate(lastMonth, config.minDate) <= 0 : false;
    const isMax = config.maxDate ? compareDate(lastDate, config.maxDate) >= 0 : false;

    const baseCellClass = [isDate];

    // Our header has three parts. By default center contains the month/year in text
    const caption = {
        center: formatWithLocale(d, locale),
        before: "",
        after: "",
        justify: "center",
        elClass: "",
    };

    // With controls, replace the title with select menus and add buttons to navigate
    if (controls) {
        const minYear = config.minDate ? getYear(config.minDate) : null;
        const maxYear = config.maxDate ? getYear(config.maxDate) : null;
        const minMonth = config.minDate ? getMonth(config.minDate) : null;
        const maxMonth = config.maxDate ? getMonth(config.maxDate) : null;

        caption.center =
            monthDrop(locale, mon, isMonth, { year, minYear, maxYear, minMonth, maxMonth }) +
            inputNum(year, isYear, { minYear, maxYear });

        caption.before = btn(chevronLeft, isPrev, isMin);
        caption.after = btn(chevronRight, isNext, isMax);
        caption.justify = "space-between";
        caption.elClass = "with-controls";
    }

    // https://www.webaccessibility.com/resource-library/platform/?platform=61

    let lines = 0;
    let hasFirstLine = false;
    let hasLastLine = false;

    let table = "";

    table += `<table class="${tableClass}">`;
    table += `<caption class="${caption.elClass}"><div style="display:flex;gap:var(--gap,0.5rem);justify-content:${caption.justify};align-items:center;">${caption.before}${caption.center}${caption.after}</div></caption>`;
    table += "<thead><tr>";
    // Build days header
    for (const day of daysForLocale(locale, "short", firstDay)) {
        // Depending on your locale, it may return with an ending .
        table += `<th scope="col" width="50">${day.replace(".", "")}</th>`;
    }
    table += "</tr></thead><tbody>";

    let rows = "<tr>";

    // spaces for the first row
    // from Monday till the first day of the month
    // - - - 1  2  3  4
    // Loop to add the last dates of the previous month
    for (let i = dayOne === 0 ? 7 : dayOne; i > firstDay; i--) {
        const classes = baseCellClass.concat([]);
        classes.push(isInactive);

        const daynum = lastMonthDate - i + 1 + firstDay;

        lastMonth.setDate(daynum);
        const isodate = toDate(lastMonth);

        const attrs = "";
        const btnAttrs = checkDisabled(isodate, config);
        rows += tdCell({ daynum, isodate, classes, attrs, btnAttrs, click });

        hasFirstLine = true;
    }

    // <td> with actual dates
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastDate; i++) {
        // Check if the current date is today
        const currentIsToday = i === thisDate && mon === thisMonth && year === thisYear;
        const currentIsActive = i === activeDate && mon === activeMonth && year === activeYear;

        d.setDate(i);
        const isodate = toDate(d);
        const classes = baseCellClass.concat([]);
        if (currentIsToday) {
            classes.push(isToday);
        }
        if (currentIsActive) {
            classes.push(isActive);
        }
        const daynum = i;
        let attrs = "";
        if (currentIsActive) {
            attrs += ' aria-current="date"';
        }
        const btnAttrs = checkDisabled(isodate, config);
        rows += tdCell({ daynum, isodate, classes, attrs, btnAttrs, click });

        if (d.getDay() === lastWeekDay) {
            // last day of week - newline
            rows += "</tr><tr>";

            lines++;
        }
    }

    // add spaces after last days of month for the last row
    // 29 30 31 - - - -
    let lastDayNextMonth = null;
    for (let i = dayend; i < 6 + firstDay; i++) {
        const classes = baseCellClass.concat([]);
        classes.push(isInactive);

        const daynum = i - dayend + 1;
        lastDayNextMonth = daynum;
        nextMonth.setDate(daynum);
        const isodate = toDate(nextMonth);

        const attrs = "";
        const btnAttrs = checkDisabled(isodate, config);
        rows += tdCell({ daynum, isodate, classes, attrs, btnAttrs, click });

        hasLastLine = true;
    }
    rows += "</tr>";

    if (hasLastLine) {
        lines++;
    }

    if (lines < 6) {
        let extraRow = "<tr>";
        if (hasFirstLine) {
            for (let i = 1; i < 8; i++) {
                const classes = baseCellClass.concat([]);
                classes.push(isInactive);

                const daynum = lastDayNextMonth + i;
                nextMonth.setDate(daynum);
                const isodate = toDate(nextMonth);

                const attrs = "";
                const btnAttrs = "";
                extraRow += tdCell({ daynum, isodate, classes, attrs, btnAttrs, click });
            }
            extraRow += "</tr>";
            rows = rows + extraRow;
        } else {
            for (let i = 7; i > 0; i--) {
                const classes = baseCellClass.concat([]);
                classes.push(isInactive);

                const daynum = lastMonthDate - i + 1;

                lastMonth.setDate(daynum);
                const isodate = toDate(lastMonth);

                const attrs = "";
                const btnAttrs = "";
                extraRow += tdCell({ daynum, isodate, classes, attrs, btnAttrs, click });
            }
            extraRow += "</tr>";
            rows = extraRow + rows;
        }
    }

    table += `${rows}</tbody></table>`;
    elem.innerHTML = table;

    const tableEl = elem.querySelector("table");
    tableEl.style.tableLayout = "fixed";
}

function createCalendarWithValue(el) {
    const data = el.dataset;
    // Set default state
    if (!data.value && !data.display) {
        data.value = toDate(currentDay());
    }
    if (!data.display) {
        const v = data.value || toDate(currentDay());
        const dateParts = dateComponents(expandDate(v), "yyyy-mm-dd");
        data.display = `${dateParts.year}-${dateParts.month}`;
    }
    createCalendar(el, toInt(getYear(data.display)), toInt(getMonth(data.display)));
}

/**
 * @type {WeakMap<Element,Function>}
 */
const cleanupMap = new WeakMap();

const eventHandler = {
    handleEvent: (ev) => {
        eventHandler[`$${ev.type}`](ev);
    },
    $click: (ev) => {
        /** @type {HTMLButtonElement} */
        const btn = ev.target.closest("button");
        if (!btn) {
            return;
        }

        const cal = getParentCalendar(btn);
        const data = cal.dataset;
        const v = data.display;

        const y = toInt(getYear(v));
        const m = toInt(getMonth(v)) - 1; // Month is -1 based

        // Navigation
        if (btn.classList.contains(isPrev)) {
            const prev = getPreviousMonth(y, m);
            data.display = getYearMonth(toDate(prev));
        }
        if (btn.classList.contains(isNext)) {
            const next = getNextMonth(y, m);
            data.display = getYearMonth(toDate(next));
        }

        // Click on a date
        /** @type {HTMLTableCellElement} */
        const cell = btn.closest("td[data-date]");
        if (cell) {
            const cellValue = cell.dataset.date;
            const clickHandler = cellClickHandler.get(cal);
            clickHandler(cal, cellValue);
        }
    },
    $change: (ev) => {
        const input = ev.target;

        const cal = getParentCalendar(input);
        const data = cal.dataset;
        const v = data.display;

        const y = toInt(getYear(v));
        const m = toInt(getMonth(v)) - 1; // Month is -1 based

        const iv = input.value;
        if (input.classList.contains(isMonth)) {
            data.display = toDate(utcDate(y, iv, 1));
        }
        if (input.classList.contains(isYear)) {
            data.display = toDate(utcDate(iv, m, 1));
        }
    },
};

const events = ["click", "change"];
dynamicBehaviour(
    "div[data-calendar]",
    /**
     * @param {HTMLDivElement} el
     */
    (el) => {
        createCalendarWithValue(el);
        cleanupMap.set(el, observeAttrs(el, ["data-value", "data-display"], createCalendarWithValue));
        on(events, eventHandler, el);
    },
    /**
     * @param {HTMLDivElement} el
     */
    (el) => {
        getAndRun(cleanupMap, el);
        el.innerHTML = "";
        off(events, eventHandler, el);
    },
);
