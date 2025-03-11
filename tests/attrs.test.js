import { expect, test } from "bun:test";
import { getAttr, getBoolData, hasAttr, setAttr } from "../src/utils/attrs.js";

test("get", () => {
    const el = document.createElement("div");
    el.setAttribute("id", "test");
    expect(getAttr(el, "id")).toBe("test");
});

test("has", () => {
    const el = document.createElement("div");
    el.id = "test";
    expect(hasAttr(el, "id")).toBe(true);
    expect(hasAttr(el, "name")).toBe(false);
});

test("set", () => {
    const el = document.createElement("div");
    setAttr(el, "id", "new");
    expect(getAttr(el, "id")).toBe("new");

    setAttr(el, {
        myattr: "myname",
        "data-test": "mytest",
    });
    expect(getAttr(el, "myattr")).toBe("myname");
    expect(getAttr(el, "data-test")).toBe("mytest");
});

test("getBooleanData", () => {
    const el = document.createElement("div");
    el.setAttribute("data-empty", "");
    el.dataset.bool = "true";
    el.dataset.dataempty = "";

    expect(getBoolData(el, "bool")).toBe(true);
    expect(getBoolData(el, "empty")).toBe(true); // empty is true
    expect(getBoolData(el, "dataempty")).toBe(true); // empty is true

    setAttr(el, "data-UPPER", "true");
    setAttr(el, "data-UPPERTYPE", true);

    expect(getBoolData(el, "upper")).toBe(true);
    expect(getBoolData(el, "uppertype")).toBe(true);
});
