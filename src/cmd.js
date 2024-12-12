import dynamicBehaviour from "./dynamicBehaviour.js";
import { dispatch, off, on } from "./utils/events.js";
import { simpleParam, strArray } from "./utils/misc.js";
import { byId, qsa } from "./utils/query.js";

// Inspired by invokers
// @link https://open-ui.org/components/invokers.explainer/
// This will run native function on elements or dispatch an event

dynamicBehaviour(
    "button[data-cmd]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        const eventHandler = (event) => {
            const data = el.dataset;
            const command = data.cmd;
            const target = data.cmdFor;
            const args = strArray(data.cmdArgs);

            const params = [];
            for (const arg of args) {
                params.push(simpleParam(arg));
            }

            const targets = target.startsWith("#") || target.startsWith(".") ? qsa(target) : [byId(target)];
            for (const entry of targets) {
                if (!entry) {
                    continue;
                }
                if (typeof entry[command] === "function") {
                    entry[command](...params);
                } else {
                    dispatch(command, entry, params);
                }
            }
        };
        //@ts-ignore
        el.handleEvent = eventHandler;

        on("click", el);
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        off("click", el);
    },
);
