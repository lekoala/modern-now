import dynamicBehaviour from "./dynamicBehaviour.js";
import { getAttr } from "./utils/attrs.js";
import { currentDay, currentUTCDay, dateWithoutTimezone, expandDate, toDate, utcDate } from "./utils/date.js";
import { dispatch, off, on } from "./utils/events.js";
import { getAndRun } from "./utils/map.js";
import { getDocLang, observeAttrs, simpleConfig, toInt } from "./utils/misc.js";
import { byId } from "./utils/query.js";
import { ucfirst } from "./utils/str.js";

/**
 * @param {String} locale
 * @param {*} month short|long
 * @returns {Array} An array with 12 entries, starting with January
 */
function monthsForLocale(locale = "en-US", month = "short") {
    const applyFormat = new Intl.DateTimeFormat(locale, { month }).format;
    return [...Array(12).keys()].map((m) => applyFormat(new Date(Date.UTC(2024, m))));
}

/**
 * @param {String} locale
 * @param {*} weekday short|long
 * @param {Number} firstDay First day (Monday by default = 1)
 * @returns {Array} An array with 7 entries, starting with selected first day
 */
function daysForLocale(locale = "en-US", weekday = "short", firstDay = 1) {
    const now = new Date();
    const format = new Intl.DateTimeFormat(locale, { weekday }).format;
    return [...Array(7).keys()].map((day) =>
        format(new Date().getTime() - (now.getDay() - ((day + firstDay) % 7)) * 86400000),
    );
}

function formatWithLocale(date, locale = "en-US") {
    return ucfirst(
        new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
        }).format(date),
    );
}

function getLastDayOfMonth(year, month) {
    // Set the next month, then 0 (= -1 day)
    return utcDate(year, toInt(month) + 1, 0);
}

function getLastDayOfPreviousMonth(year, month) {
    // Set the month, then 0 (= -1 day)
    return utcDate(year, toInt(month), 0);
}

function getPreviousMonth(year, month, date = 1) {
    if (month === 0) {
        return utcDate(toInt(year) - 1, 11, date);
    }
    return utcDate(year, toInt(month) - 1, date);
}

function getNextMonth(year, month, date = 1) {
    if (month === 11) {
        return utcDate(toInt(year) + 1, 0, date);
    }
    return utcDate(year, toInt(month) + 1, date);
}

function getDay(year, month, date) {
    return utcDate(year, month, date).getDay();
}

function btn(v, cls = "") {
    return `<button type="button" class="${cls}" style="min-width:44px">${v}</button>`;
}

function inputNum(v, cls = "") {
    return `<input type="number" class="${cls}" value="${v}" size="4" max="9999" style="max-width:5em;width:auto;" />`;
}

function drop(arr, v, cls = "") {
    const opts = arr.map((val, idx) => {
        return `<option value="${idx}"${idx === v ? 'selected="selected"' : ""}>${val}</option>`;
    });
    return `<select class="${cls}" style="width:auto">${opts}</select>`;
}

function tdCell(daynum, isodate, classes, attrs = "", click = null) {
    const dayBtn = `<button type="button" class="is-calendar-button" style="width:100%;height:100%;">${daynum}</button>`;
    return `<td class="${classes.join(" ")}" data-date="${isodate}"${attrs} style="padding:0;height:44px;">${click ? dayBtn : daynum}</td>`;
}

// Some other inspiration here https://github.com/duetds/date-picker/blob/master/src/components/duet-date-picker/date-utils.ts

const cellClickHandler = new WeakMap();

/**
 * @param {HTMLElement} elem
 * @param {Number} year
 * @param {Number} month (from 1 to 12)
 */
function createCalendar(elem, year, month) {
    const mon = month - 1; // months in JS are 0..11, not 1..12
    const d = dateWithoutTimezone(utcDate(year, mon, 1));

    // Config
    const data = elem.dataset;
    const config = simpleConfig(data.calendar);
    const locale = getAttr(elem, "lang") || config.lang || getDocLang();
    const controls = config.controls;
    const click = config.click;
    const tableClass = config.tableClass || "";

    if (click) {
        if (typeof click === "function") {
            cellClickHandler.set(elem, click);
        } else {
            cellClickHandler.set(elem, (node, v) => {
                const input = byId(click, "input");
                if (input) {
                    input.value = v;
                    dispatch("input", input);
                }
            });
        }
    }

    // Create our variables
    const firstDay = toInt(config.firstDay || 1); // Sunday = 0, Monday = 1 ... Saturday = 6
    const lastWeekDay = firstDay === 0 ? 6 : firstDay - 1;

    // Current date, regardless of timezone
    const today = currentUTCDay();

    const thisDate = today.getDate();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

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

    const baseCellClass = ["is-date"];

    let center = formatWithLocale(d, locale);
    let prev = "";
    let next = "";
    let justify = "center";
    if (controls) {
        center = drop(monthsForLocale(locale, "long"), mon, "is-month") + inputNum(year, "is-year");
        prev = btn("<", "is-prev");
        next = btn(">", "is-next");
        justify = "space-between";
    }

    // https://www.webaccessibility.com/resource-library/platform/?platform=61

    let lines = 0;
    let hasFirstLine = false;
    let hasLastLine = false;

    let table = "";

    table += `<table class="${tableClass}">`;
    table += `<caption><div style="display:flex;justify-content:${justify};align-items:center;">${prev}${center}${next}</div></caption>`;
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
        classes.push("is-inactive");

        const daynum = lastMonthDate - i + 1 + firstDay;

        lastMonth.setDate(daynum);
        const isodate = toDate(lastMonth);
        rows += tdCell(daynum, isodate, classes, "", click);

        hasFirstLine = true;
    }

    // <td> with actual dates
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastDate; i++) {
        // Check if the current date is today
        const isToday = i === thisDate && mon === thisMonth && year === thisYear;

        d.setDate(i);
        const isodate = toDate(d);
        const classes = baseCellClass.concat([]);
        if (isToday) {
            classes.push("is-active");
        }
        const daynum = i;
        let attrs = "";
        if (isToday) {
            attrs += ' aria-current="date"';
        }
        rows += tdCell(daynum, isodate, classes, attrs, click);

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
        classes.push("is-inactive");

        const daynum = i - dayend + 1;
        lastDayNextMonth = daynum;
        nextMonth.setDate(daynum);
        const isodate = toDate(nextMonth);
        rows += tdCell(daynum, isodate, classes, "", click);

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
                classes.push("is-inactive");

                const daynum = lastDayNextMonth + i;
                nextMonth.setDate(daynum);
                const isodate = toDate(nextMonth);
                extraRow += tdCell(daynum, isodate, classes, "", click);
            }
            extraRow += "</tr>";
            rows = rows + extraRow;
        } else {
            for (let i = 7; i > 0; i--) {
                const classes = baseCellClass.concat([]);
                classes.push("is-inactive");

                const daynum = lastMonthDate - i + 1;

                lastMonth.setDate(daynum);
                const isodate = toDate(lastMonth);
                extraRow += tdCell(daynum, isodate, classes, "", click);
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
    const v = expandDate(data.value || toDate(currentDay()));
    const dateParts = v.split("-");
    if (!data.value) {
        data.value = v;
    }
    createCalendar(el, toInt(dateParts[0]), toInt(dateParts[1]));
}

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

        /** @type {HTMLDivElement} */
        const cal = btn.closest("[data-calendar]");
        const v = cal.dataset.value.split("-");

        const y = toInt(v[0]);
        const m = toInt(v[1]) - 1;

        if (btn.classList.contains("is-prev")) {
            const prev = getPreviousMonth(y, m);
            cal.dataset.value = toDate(prev);
        }
        if (btn.classList.contains("is-next")) {
            const next = getNextMonth(y, m);
            cal.dataset.value = toDate(next);
        }

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

        /** @type {HTMLDivElement} */
        const cal = input.closest("[data-calendar]");
        const v = cal.dataset.value.split("-");

        const y = toInt(v[0]);
        const m = toInt(v[1]) - 1;

        if (input.classList.contains("is-month")) {
            cal.dataset.value = toDate(utcDate(y, input.value, 1));
        }
        if (input.classList.contains("is-year")) {
            cal.dataset.value = toDate(utcDate(input.value, m, 1));
        }
    },
};

const events = ["click", "change"];
dynamicBehaviour(
    "[data-calendar]",
    (el) => {
        createCalendarWithValue(el);
        cleanupMap.set(el, observeAttrs(el, ["data-value"], createCalendarWithValue));

        on(events, eventHandler, el);
    },
    (el) => {
        getAndRun(cleanupMap, el);
        el.innerHTML = "";

        off(events, eventHandler, el);
    },
);
