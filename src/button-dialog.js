import { getBoolData, getData, setAttr, setCssVar } from "./utils/attrs.js";
import { on, off } from "./utils/events.js";
import { byId } from "./utils/query.js";
import {
	supportsDialog,
	getScrollBarWidth,
	simpleConfig,
	doWithAnimation,
	getDocEl,
} from "./utils/misc.js";
import dynamicBehaviour from "./dynamicBehaviour.js";

/**
 * @typedef DialogConfig
 * @property {Boolean} modal
 * @property {Boolean} dismissible
 */

/**
 * When clicking on the backdrop, the nodename is the dialog itself
 * This works really well IF the dialog has no padding (otherwise clicking on the padded area would trigger this)
 * @param {MouseEvent} ev
 */
const handleDialogClick = (ev) => {
	/** @type {HTMLDialogElement} */
	//@ts-ignore
	const t = ev.target;
	// https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop
	if (t.nodeName === "DIALOG" && getDialogConfig(t).dismissible) {
		// If dialog is focused, transition won't play (animation works fine)
		if (document.activeElement === t) {
			t.blur();
		}
		closeDialogWithAnimation(t);
	}

	const btn = t.closest("button");
	if (btn && getBoolData(btn, "dialogClose")) {
		closeDialogWithAnimation(btn.closest("dialog"));
	}
};

/**
 * Note that we rely on animation instead of transition since it makes showing the dialog much easier (no display:none issue).
 * Keep in mind that this will not trigger when using 'Esc' unless we have some specifc :not([open]) with allow-discrete transitions
 * @link https://frontendmasters.com/blog/the-dialog-element-with-entry-and-exit-animations/
 * The alternative to this is to hide visually and keep display:block always on, then you can animate as you wish
 * but you need to deal with inert
 * @link https://codepen.io/lekoalabe/pen/NPqMwJB
 * @param {HTMLDialogElement} dialog
 */
function closeDialogWithAnimation(dialog) {
	if (!dialog || !dialog.open) {
		return;
	}
	doWithAnimation(
		dialog,
		() => {
			dialog.close();
		},
		false,
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
 * Get dialog linked to a button
 * @param {HTMLButtonElement} btn
 * @returns {HTMLDialogElement|null}
 */
function getDialog(btn) {
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
 * Reads config on the dialog element
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
 * This deals with button opening/closing dialogs
 * @param {MouseEvent} ev
 */
const handleButtonClick = (ev) => {
	// If it doesn't support dialog and it's not yet polyfilled
	// see https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.esm.js#L850
	if (
		!supportsDialog() &&
		!HTMLFormElement.prototype.submit.toString().includes("call(this)")
	) {
		return;
	}

	// Look for button, maybe we clicked on some nested html tag (or svg) inside the button
	/** @type {HTMLButtonElement} */
	//@ts-ignore
	const btn = ev.target.closest("button");
	if (!btn) {
		return;
	}

	const dialogEl = getDialog(btn);
	if (!dialogEl) {
		return;
	}

	// it's a close button (can be outside of modal)
	const dialogClose = getBoolData(btn, "dialogClose");
	//@link https://www.javascripttutorial.net/web-apis/javascript-dialog-api/
	if (dialogClose) {
		closeDialogWithAnimation(dialogEl);
		return;
	}

	// Read the config each time we open the dialog
	const dialogConfig = getDialogConfig(dialogEl);

	// If dismissible or modal, use showModal()
	if (dialogConfig.dismissible || dialogConfig.modal) {
		refreshScrollbarVar();
		// Will close when using 'Esc' since it's blocking the UI
		dialogEl.showModal();
	} else {
		// It's just a dialog, use show()
		// Will not close with 'Esc' since it's not blocking the UI
		dialogEl.show();
	}
};

// Init variable
refreshScrollbarVar();

dynamicBehaviour(
	"button[data-dialog]",
	/**
	 * @param {HTMLButtonElement} el
	 */
	(el) => {
		on("click", handleButtonClick, el);
		const dialogEl = getDialog(el);
		if (dialogEl) {
			setAttr(el, "aria-controls", dialogEl.id);
			on("click", handleDialogClick, dialogEl);
		}
	},
	/**
	 * @param {HTMLButtonElement} el
	 */
	(el) => {
		off("click", handleButtonClick, el);
		// Cleanup close handler on dialog if set
		const dialogEl = getDialog(el);
		if (dialogEl) {
			off("click", handleDialogClick, dialogEl);
		}
	},
);
