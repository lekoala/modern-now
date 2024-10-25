import { expect, test } from "bun:test";
import { on, off, once, dispatch } from "../src/utils/events.js";

test("on", () => {
    let called = false;
    let handleCalled = false;
    const el = document.createElement("div");
    el.handleEvent = (ev) => {
        handleCalled = true;
    };

    on("customEvent", () => {
        called = true;
    });
    on("click", el);

    expect(called).toBe(false);
    dispatch("customEvent");
    expect(called).toBe(true);

    expect(handleCalled).toBe(false);
    dispatch("click", el);
    expect(handleCalled).toBe(true);
});

test("once", () => {
    let counter = 0;

    once("increment", () => {
        counter++;
    });

    expect(counter).toBe(0);
    dispatch("increment");
    expect(counter).toBe(1);
    dispatch("increment");
    expect(counter).toBe(1); // still one
});

test("off", () => {
    let called = false;
    const handler = () => {
        called = true;
    };

    // Keep in mind we need to pass the same handler reference
    on("customEvent", handler);
    off("customEvent", handler);

    expect(called).toBe(false);
    dispatch("customEvent");
    expect(called).toBe(false);
});
