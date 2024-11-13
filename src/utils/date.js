/**
 * @typedef DateRange
 * @property {Number} seconds
 * @property {Number} minutes
 * @property {Number} hours
 * @property {Number} days
 * @property {Number} [weeks]
 * @property {Number} [months]
 * @property {Number} [years]
 */

/**
 * @returns {DateRange}
 */
export function dateRanges() {
    return {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    };
}

/**
 * Only supports "s" like 2s = 2000
 * @param {String|Number} str
 * @returns {Number}
 */
export function toMs(str) {
    if (!str) {
        return 0;
    }
    const s = str.toString();
    const i = Number.parseInt(s);
    if (s.includes("s")) {
        return i * 1000;
    }
    return i;
}

/**
 * Mutates a date with a given expression
 * @param {DateRange} expr
 * @param {Date|String|Number} dateOrTime
 * @returns {Date}
 */
export function changeDate(expr, dateOrTime = null) {
    let v = dateOrTime;
    if (!v) {
        v = new Date();
    }
    let t = asDate(v).getTime();
    if (expr.seconds) t += 1000 * expr.seconds;
    if (expr.minutes) t += 1000 * 60 * expr.minutes;
    if (expr.hours) t += 1000 * 60 * 60 * expr.hours;
    if (expr.days) t += 1000 * 60 * 60 * 24 * expr.days;
    return new Date(t);
}

/**
 * @param {Date|Number} dateOrTime
 * @returns {DateRange}
 */
export function getDateParts(dateOrTime) {
    const t = dateOrTime instanceof Date ? dateOrTime.getTime() : dateOrTime;
    const expr = {
        days: Math.floor(t / (1000 * 60 * 60 * 24)),
        hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((t % (1000 * 60)) / 1000),
    };
    return expr;
}

/**
 * String to Date in the current timezone
 * @param {Date|Number|string} str A date, a timestamp or a string
 * @returns {Date}
 */
export function asDate(str = null) {
    if (!str) {
        return new Date();
    }
    if (str instanceof Date) {
        return str;
    }
    if (Number.isInteger(str)) {
        return new Date(str);
    }
    return new Date(toIsoDateTime(expandDateTime(str)));
}

/**
 * Expand string in iso formatting
 * 2024 => 2024-01-01 00:00:00
 * 2024-01 => 2024-01-01 00:00:00
 * 2024-01-01 => 2024-01-01 00:00:00
 * 2024-01-01 10:00 => 2024-01-01 10:00:00
 *
 * @param {string|Number} str
 * @returns {string}
 */
export function expandDateTime(str) {
    let v = str;
    // If it's a time only, we need prepend a date
    if (isTimeOnly(v)) {
        v = `1970-01-01 ${v}`;
    }
    return expandWithFormat(v, "1970-01-01 00:00:00");
}

/**
 *
 * @param {string} str 2024-01-01 00:00:00
 * @returns {string} 2024-01-01T00:00:00Z
 */
export function toIsoDateTime(str) {
    const s = str.split(" ");
    return `${s[0]}T${s[1]}Z`;
}

/**
 * Expand string in iso formatting
 * 2024 => 2024-01-01 00:00:00
 * 2024-01 => 2024-01-01 00:00:00
 * 2024-01-01 => 2024-01-01 00:00:00
 *
 * @param {string|Number} str
 * @returns {string}
 */
export function expandDate(str) {
    return expandWithFormat(str, "1970-01-01");
}

/**
 * Expand string in iso formatting
 * 10:00 => 10:00:00
 *
 * @param {string|Number} str
 * @returns {string}
 */
export function expandTime(str) {
    return expandWithFormat(str, "00:00:00");
}

/**
 *
 * @param {string|Number} str
 * @param {string} format
 * @returns {string}
 */
export function expandWithFormat(str, format) {
    let res = str.toString();
    while (res.length < format.length) {
        res += format[res.length];
    }
    return res;
}

/**
 * Is a time only string, 20:00
 * @param {string|Number} str
 * @returns {Boolean}
 */
export function isTimeOnly(str) {
    return hasTime(str) && !hasDate(str);
}

/**
 * Has a time part
 * @param {string|Number} str
 * @returns {Boolean}
 */
export function hasTime(str) {
    return str.toString().includes(":");
}

/**
 * Has a date part, like 2024-01-01 or even just 2024
 * @param {string|Number} str
 * @returns {Boolean}
 */
export function hasDate(str) {
    return str.toString().includes("-") || !hasTime(str);
}

/**
 * @param {Date|string} date
 * @returns {Boolean}
 */
export function isDay(date) {
    const d = asDate(date);
    return d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0;
}

/**
 * Returns a date object with the current day
 * @returns {Date}
 */
export function currentDay() {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    return day;
}

/**
 * Returns a date object with the current day, ignoring timezone
 * @returns {Date}
 */
export function currentUTCDay() {
    return dateWithoutTimezone(new Date());
}

/**
 * Convert to a datetime, ignoring timezone (will use actual day being picked)
 * @param {Date|string} date
 * @returns {string} YYYY-MM-DD HH:MM:SS
 */
export function toDateTime(date) {
    return dateWithoutTimezone(date).toISOString().split(".")[0].replace("T", " ");
}

/**
 * @link https://dev.to/shubhampatilsd/removing-timezones-from-dates-in-javascript-46ah
 * @param {Date|string} date
 * @returns {Date}
 */
export function dateWithoutTimezone(date) {
    const d = asDate(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 * @returns {Date}
 */
export function utcDate(year, month, date) {
    return new Date(Date.UTC(year, month, date));
}

/**
 * @param {Date|string} date
 * @returns {string} YYYY-MM-DD
 */
export function toDate(date) {
    return toDateTime(date).split(" ")[0];
}

/**
 * @param {Date|string} date
 * @returns {string} HH:MM:SS
 */
export function toTime(date) {
    return toDateTime(date).split(" ")[1];
}

/**
 * @param {String|Date|null} date
 * @returns {Number}
 */
export function toTimestamp(date = null) {
    if (!date) {
        return 0;
    }
    return asDate(date).getTime();
}

/**
 * IOS >= 14
 * @link https://caniuse.com/mdn-javascript_builtins_intl_relativetimeformat
 * @returns {Boolean}
 */
export function supportsRelativeTime() {
    return Intl.RelativeTimeFormat !== undefined;
}
