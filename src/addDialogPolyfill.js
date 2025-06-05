import dynamicBehaviour from "./dynamicBehaviour.js";
import { addClass } from "./utils/attrs.js";
import { getDocEl, injectCss, supportsDialog } from "./utils/misc.js";

/*
This is a thin wrapper around dialog-polyfill (https://www.jsdelivr.com/package/npm/dialog-polyfill)
It is loaded dynamically from a cdn (or from DIALOG_POLYFILL_URL location) for older browsers
dialog-polyfill styles are not used in favor of a more opiniated version that allows setting a common --backdrop-bg variable
*/

//@ts-ignore
const loc = window.DIALOG_POLYFILL_URL || "https://cdn.jsdelivr.net/npm/dialog-polyfill/+esm";

// inline and customize css from https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.css
const css = /*css*/ `dialog{position:fixed;left:0;right:0;top:0;bottom:0;width:fit-content;height:fit-content;overflow:auto;max-height:90vh;max-width:90vw;background: white}
dialog:not([open]){display:none}
dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop-bg,rgba(0,0,0,.1))}
._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}`;

export default () => {
    // don't do anything since its supported
    if (supportsDialog()) {
        return;
    }
    const id = "dialog-polyfill";
    addClass(getDocEl(), id);
    injectCss(css, id);
    // import polyfill dynamically then register behaviour
    import(loc).then((module) => {
        const polyfill = module.default;
        const selector = "dialog";
        dynamicBehaviour(selector, (el) => {
            polyfill.registerDialog(el);
        });
    });
};
