import { expect, test } from "bun:test";
import {
    expandDateTime,
    expandDate,
    expandTime,
    expandWithFormat,
    changeDate,
    hasTime,
    hasDate,
    isDay,
    isTimeOnly,
    toDate,
    toTime,
    toTimestamp,
    toDateTime,
} from "../src/utils/date.js";

test("expandDateTime", () => {
    expect(expandDateTime(2024)).toBe("2024-01-01 00:00:00");
    expect(expandDateTime("2024-01")).toBe("2024-01-01 00:00:00");
    expect(expandDateTime("10:00")).toBe("1970-01-01 10:00:00");
});

test("expandDate", () => {
    expect(expandDate(2024)).toBe("2024-01-01");
    expect(expandDate("2024-01")).toBe("2024-01-01");
});

test("expandTime", () => {
    expect(expandTime("10:00")).toBe("10:00:00");
});

test("expandWithFormat", () => {
    expect(expandWithFormat("2024-01", "1900-01-01T00:00:00Z")).toBe("2024-01-01T00:00:00Z");
});

test("changeDate", () => {
    const dateRes = new Date("2024-01-01T11:00:00.000Z");
    expect(
        changeDate(
            {
                hours: 1,
            },
            "2024-01-01 10:00:00",
        ),
    ).toEqual(dateRes);
});

test("isHas", () => {
    const timeOnly = "10:00";
    const dayOnly = "2024-01-01";
    const dayTime = "2024-01-01 10:00";

    expect(hasTime(timeOnly)).toBe(true);
    expect(isTimeOnly(timeOnly)).toBe(true);
    expect(hasDate(timeOnly)).toBe(false);
    expect(isDay(timeOnly)).toBe(false);

    expect(hasTime(dayOnly)).toBe(false);
    expect(isTimeOnly(dayOnly)).toBe(false);
    expect(hasDate(dayOnly)).toBe(true);
    expect(isDay(dayOnly)).toBe(true);

    expect(hasTime(dayTime)).toBe(true);
    expect(isTimeOnly(dayTime)).toBe(false);
    expect(hasDate(dayTime)).toBe(true);
    expect(isDay(dayTime)).toBe(false);
});

test("to", () => {
    const dayTime = "2024-01-01 10:00"; // ts = 1704103200000

    expect(toDateTime(dayTime)).toBe("2024-01-01 10:00:00");
    expect(toDate(dayTime)).toBe("2024-01-01");
    expect(toTime(dayTime)).toBe("10:00:00");
    expect(toTimestamp(dayTime)).toBe(1704103200000);
});
