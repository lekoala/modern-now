import dynamicBehaviour from "./dynamicBehaviour.js";
import { addClass } from "./utils/attrs.js";
import { injectCss, supportsDialog } from "./utils/misc.js";

/*
This is a thin wrapper around dialog-polyfill (https://www.jsdelivr.com/package/npm/dialog-polyfill)
It is loaded dynamically from a cdn (or from a set DIALOG_POLYFILL_URL) for older browsers
dialog-polyfill styles are not used in favor of a more opiniated version that allows setting a common --backdrop-bg variable
*/

//@ts-ignore
const loc = window.DIALOG_POLYFILL_URL || "https://cdn.jsdelivr.net/npm/dialog-polyfill/+esm";

export default () => {
    if (supportsDialog()) {
        return;
    }
    const id = "dialog-polyfill";
    addClass(document.documentElement, id);
    // inline and customize css from https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.css
    const css = /*css*/ `dialog{position:fixed;left:0;right:0;top:0;bottom:0;width:fit-content;height:fit-content;overflow:auto;max-height:90vh;max-width:90vw}
dialog:not([open]){display:none}
dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop-bg,rgba(0,0,0,.1))}
._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}`;
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
