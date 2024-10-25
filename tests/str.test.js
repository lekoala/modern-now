import { expect, test } from "bun:test";
import { normalize, slugify, dashToCamel, camelToDash, ucfirst } from "../src/utils/str.js";

test("normalize", () => {
    expect(normalize("Crème Brûlée")).toBe("Creme Brulee");
    expect(normalize("áéíóúýčďěňřšťžů")).toBe("aeiouycdenrstzu");
});

test("slugify", () => {
    expect(slugify("Crème Brûlée")).toBe("creme-brulee");
    expect(slugify("Crème--Brûlée")).toBe("creme-brulee");
    expect(slugify("Crème  Brûlée")).toBe("creme-brulee");
});

test("dashToCamel", () => {
    expect(dashToCamel("data-attr")).toBe("dataAttr");
    expect(dashToCamel("data-attr-sub")).toBe("dataAttrSub");
    expect(dashToCamel("DATA-ATTR")).toBe("dataAttr");
});

test("camelToDash", () => {
    expect(camelToDash("dataAttr")).toBe("data-attr");
    expect(camelToDash("DataAttr")).toBe("data-attr");
    expect(camelToDash("DATaATTR")).toBe("data-attr");
});

test("ucfirst", () => {
    expect(ucfirst("dataAttr")).toBe("DataAttr");
});
