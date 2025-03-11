import { expect, test } from "bun:test";
import "../src/button-dialog.js";
import { qs } from "../src/utils/query.js";

const dialogBtn = document.createElement("button");
dialogBtn.dataset.dialog = "demo-dialog";
document.body.append(dialogBtn);

const dialog = document.createElement("dialog");
dialog.id = "demo-dialog";
document.body.append(dialog);

test("dialog", () => {
    const dialog = qs("#demo-dialog", "dialog");
    const btn = qs('[data-dialog="demo-dialog"]', "button");
    expect(dialog.open).toBe(false);
    btn.click();
    setTimeout(() => {
        expect(dialog.open).toBe(true);
    });
});
