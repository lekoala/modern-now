import { expect, test } from "bun:test";
import { getAttr, getBoolData, hasAttr, setAttr } from "../src/utils/attrs.js";

const el = document.createElement("div");

test("get", () => {
    el.setAttribute("id", "test");
    expect(getAttr(el, "id")).toBe("test");
});

test("has", () => {
    expect(hasAttr(el, "id")).toBe(true);
    expect(hasAttr(el, "name")).toBe(false);
});

test("set", () => {
    setAttr(el, "id", "new");
    expect(getAttr(el, "id")).toBe("new");

    setAttr(el, {
        "myattr": "myname",
        "data-test": "mytest",
    });
    expect(getAttr(el, "myattr")).toBe("myname");
    expect(getAttr(el, "data-test")).toBe("mytest");
});

test("getBooleanData", () => {
    el.dataset.bool = "true";
    el.dataset.empty = "";

    expect(getBoolData(el, "bool")).toBe(true);
    expect(getBoolData(el, "empty")).toBe(true); // empty is true

    setAttr(el, "data-UPPER", "true");
    setAttr(el, "data-UPPERTYPE", true);

    expect(getBoolData(el, "upper")).toBe(true);
    expect(getBoolData(el, "uppertype")).toBe(true);
});
