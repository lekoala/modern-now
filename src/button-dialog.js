import { getBoolData, getData, hasData, setCssVar } from "./utils/attrs.js";
import { on, off } from "./utils/events.js";
import { byId } from "./utils/query.js";
import { supportsDialog, getScrollBarWidth, simpleConfig, doWithAnimation, getDocEl, isChrome } from "./utils/misc.js";
import dynamicBehaviour from "./dynamicBehaviour.js";

/**
 * @typedef DialogConfig
 * @property {Boolean} modal
 * @property {Boolean} dismissible
 */

const dialogBackdropCloseHandler = (ev) => {
    const t = ev.target;
    // https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
    if (t.nodeName === "DIALOG") {
        // If dialog is focused, transition won't play (animation works fine)
        if (document.activeElement === t) {
            t.blur();
        }
        // Discrete transition only works in chrome
        closeDialogWithAnimation(t, !isChrome());
    }
};

/**
 * Note that we rely on animation instead of transition since it makes showing the dialog much easier (no display:none issue).
 * Keep in mind that this will not trigger when using 'Esc' unless we have some specifc :not([open]) with allow-discrete transitions
 * @link https://frontendmasters.com/blog/the-dialog-element-with-entry-and-exit-animations/
 * @param {HTMLDialogElement} dialog
 * @param {Boolean} force
 */
function closeDialogWithAnimation(dialog, force = false) {
    if (!dialog || !dialog.open) {
        return;
    }
    doWithAnimation(
        dialog,
        () => {
            dialog.close();
        },
        false,
        force,
    );
}

/**
 * This function is useful for offcanvas or modals with scroll disabled.
 * We want to avoid content reflow due to the scrollbars being hidden
 */
function refreshScrollbarVar() {
    setCssVar(getDocEl(), "scrollbar-width", `${getScrollBarWidth()}px`);
}

/**
 *
 * @param {HTMLButtonElement} btn
 * @returns {HTMLDialogElement|null}
 */
function getBtnDialog(btn) {
    const dialog = getData(btn, "dialog");
    if (!dialog) {
        return;
    }
    const dialogEl = byId(dialog, "dialog");
    if (!dialogEl) {
        console.error(`${dialog} not found`);
        return;
    }
    return dialogEl;
}

/**
 * @param {HTMLDialogElement} dialogEl
 * @returns {DialogConfig}
 */
function getDialogConfig(dialogEl) {
    // Dialogs have a top data-dialog config option using simple config format
    /** @type {DialogConfig} */
    const dialogConfig = simpleConfig(getData(dialogEl, "dialog"));
    // Data attributes can be used as shortcuts for properties...
    // ...with a backdrop ?
    if (getBoolData(dialogEl, "dialogModal")) {
        dialogConfig.modal = true;
    }
    // ...dismissible ?
    if (getBoolData(dialogEl, "dialogDismissible")) {
        dialogConfig.dismissible = true;
    }
    return dialogConfig;
}

/**
 * This deals with dialog trigger AND close buttons
 * @param {MouseEvent} ev
 */
const handleDialogClick = (ev) => {
    // If it doesn't support dialog and it's not yet polyfilled
    // see https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.esm.js#L850
    if (!supportsDialog() && !HTMLFormElement.prototype.submit.toString().includes("call(this)")) {
        return;
    }

    // Look for button, maybe we clicked on some nested html tag (or svg) inside the button
    //@ts-ignore
    const btn = ev.target.closest("button");
    if (!btn) {
        return;
    }

    // dialog
    const dialogEl = getBtnDialog(btn);
    // it's a close button (could be outside of modal)
    const dialogClose = getBoolData(btn, "dialogClose");

    // If we have a dialog linked on the button
    if (dialogEl) {
        //@link https://www.javascripttutorial.net/web-apis/javascript-dialog-api/
        if (dialogClose) {
            closeDialogWithAnimation(dialogEl);
        } else {
            // Read the config each time we open the dialog
            const dialogConfig = getDialogConfig(dialogEl);

            // If dismissible or modal, use showModal()
            if (dialogConfig.dismissible || dialogConfig.modal) {
                refreshScrollbarVar();
                // Will close when using 'Esc' since it's blocking the UI
                dialogEl.showModal();

                // listen for a click outside the modal
                if (dialogConfig.dismissible) {
                    on("click", dialogBackdropCloseHandler, dialogEl);
                }
            } else {
                // It's just a dialog, use show()
                // Will not close with 'Escp' since it's not blocking the UI
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
refreshScrollbarVar();

dynamicBehaviour(
    "button[data-dialog],button[data-dialog-close]",
    /**
     * @param {HTMLButtonElement} el
     */
    (el) => {
        on("click", handleDialogClick, el);
    },
    /**
     * @param {HTMLButtonElement} el
     */
    (el) => {
        off("click", handleDialogClick, el);
        // Cleanup close handler on dialog if set
        const dialogEl = getBtnDialog(el);
        if (dialogEl) {
            off("click", dialogBackdropCloseHandler, dialogEl);
        }
    },
);
