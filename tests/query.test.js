import { beforeAll, expect, test } from "bun:test";
import { byId, qs, qsa } from "../src/utils/query.js";

function createTestElement() {
    const testid = document.createElement("div");
    testid.setAttribute("id", "testid");
    document.body.appendChild(testid);
}

beforeAll(() => {
    createTestElement();
});

test("id", () => {
    expect(byId("testid").id).toBe("testid");
});

test("selector", () => {
    expect(qs("#testid").id).toBe("testid");
});

test("all", () => {
    expect(qsa("#testid").length).toBe(1);
});
