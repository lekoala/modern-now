import { expect, test } from "bun:test";
import { normalize, slugify, dashToCamel, camelToDash, ucfirst, enDigits, dataCamelToDash } from "../src/utils/str.js";

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
    expect(camelToDash("HTMLlowerATTR")).toBe("htmllower-attr");
    expect(camelToDash("MyTitle")).toBe("my-title");
});

test("dataCamelToDash", () => {
    expect(dataCamelToDash("dataAttr")).toBe("data-attr");
    // https://jsfiddle.net/370wdpsg/2/
    // with multiple uppercase letters, there is a dash before each one
    // this match behaviour of dataset conversion in browsers
    expect(dataCamelToDash("DataAttr")).toBe("-data-attr");
    expect(dataCamelToDash("DATaATTR")).toBe("-d-a-ta-a-t-t-r");
    expect(dataCamelToDash("HTMLlowerATTR")).toBe("-h-t-m-llower-a-t-t-r");

    // <a data--My-Title="Hello">Click me</a> => MyTitle
    expect(dataCamelToDash("MyTitle")).toBe("-my-title");
});

test("ucfirst", () => {
    expect(ucfirst("dataAttr")).toBe("DataAttr");
});

test("enDigits", () => {
    // English: 0123456789 - Persian: ۰۱۲۳۴۵۶۷۸۹ - Arabic: ٠١٢٣٤٥٦٧٨٩';
    // English: 0123456789 - Persian: 0123456789 - Arabic: 0123456789
    expect(enDigits("۰۱۲۳۴۵۶۷۸۹")).toBe("0123456789");
    expect(enDigits("٠١٢٣٤٥٦٧٨٩")).toBe("0123456789");
});
