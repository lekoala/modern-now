import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { getBoolData, getData, hasData, setCssVar } from "./utils/attrs.js";
import { on, off } from "./utils/events.js";
import { byId } from "./utils/query.js";
import { supportsDialog, getScrollBarWidth, simpleConfig, doWithAnimation } from "./utils/misc.js";

/**
 * @typedef {Object} HTML
 * @property {new () => HTMLButtonElement} Button
 * @typedef {Object} Registry
 * @property {HTML} HTML
 */

const dialogCloseHandler = (ev) => {
    // https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
    if (ev.target.nodeName === "DIALOG") {
        ev.target.close();
        off("click", dialogCloseHandler, ev.target);
    }
};

/**
 * Note that we rely on animation instead of transition since it makes show
 * the dialog much easier (no display:none issue)
 * @param {HTMLDialogElement} dialog
 */
function closeDialogWithAnimation(dialog) {
    if (!dialog) {
        return;
    }
    doWithAnimation(dialog, () => {
        dialog.close();
    });
}

/**
 * @param {HTMLButtonElement} btn
 * @param {MouseEvent} ev
 */
const handleDialogClick = (btn, ev) => {
    // If it doesn't support dialog and it's not yet polyfilled
    // see https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.esm.js#L850
    if (!supportsDialog() && !HTMLFormElement.prototype.submit.toString().includes("call(this)")) {
        return;
    }

    // dialog id
    const dialog = getData(btn, "dialog");
    // close (current dialog or parent)
    const dialogClose = getBoolData(btn, "dialogClose");
    if (dialog) {
        const dialogEl = byId(dialog, "dialog");
        if (!dialogEl) {
            console.error(`${dialog} not found`);
            return;
        }
        // Dialogs have a top data-dialog config option
        const dialogData = dialogEl.dataset;
        const dialogConfig = simpleConfig(dialogData.dialog);
        // with a backdrop ?
        if (hasData(dialogEl, "dialogModal")) {
            dialogConfig.modal = true;
        }
        // dismissible ?
        if (hasData(dialogEl, "dialogDismissible")) {
            dialogConfig.dismissible = true;
        }
        //@link https://www.javascripttutorial.net/web-apis/javascript-dialog-api/
        if (dialogClose) {
            closeDialogWithAnimation(dialogEl);
        } else {
            if (dialogConfig.dismissible || dialogConfig.modal) {
                // useful for offcanvas or modals with scroll disabled
                // we want to avoid content reflow due to the scrollbars being hidden
                setCssVar(document.documentElement, "scrollbar-width", `${getScrollBarWidth()}px`);
                dialogEl.showModal();

                // listen for a click outside the modal
                if (dialogConfig.dismissible) {
                    on("click", dialogCloseHandler, dialogEl);
                }
            } else {
                dialogEl.show();
            }
        }

        // Return early
        return;
    }

    // No dialog and clicked on a close button ? Look for closest dialog
    if (dialogClose) {
        closeDialogWithAnimation(btn.closest("dialog"));
    }
};

// Init variable
setCssVar(document.documentElement, "scrollbar-width", `${getScrollBarWidth()}px`);

const { HTML } = createRegistry();
define(
    "button[data-dialog],button[data-dialog-close]",
    class extends HTML.Button {
        connectedCallback() {
            on("click", this);
        }

        disconnectedCallback() {
            off("click", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $click(ev) {
            handleDialogClick(this, ev);
        }
    },
);
