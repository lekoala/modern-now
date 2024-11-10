import dynamicBehaviour from "./dynamicBehaviour.js";
import { getAttr, removeAttr, setAttr } from "./utils/attrs.js";
import { dispatch, off, on } from "./utils/events.js";
import { ce, debounce, debounceLeading, isString, observeAttrs, simpleConfig } from "./utils/misc.js";
import { qs } from "./utils/query.js";
import { toMs } from "./utils/date.js";
import { updateMapData } from "./utils/map.js";

const map = new WeakMap();

const CUSTOM_EVENT = "hx";

/**
 * @param {HTMLElement} el
 * @returns {string}
 */
function getDefaultTrigger(el) {
    const n = el.nodeName;
    if (n === "FORM") {
        return "submit";
    }
    if (n === "DIALOG") {
        return "dialogOpen";
    }
    if (["INPUT", "SELECT", "TEXTAREA"].includes(n)) {
        return "change";
    }
    return "click";
}

/**
 * @param {HTMLElement} el
 * @returns {string}
 */
function getDefaultMethod(el) {
    if (["A", "DIALOG"].includes(el.nodeName)) {
        return "GET";
    }
    return "POST";
}

function resolveTarget(el, target) {
    if (target === "parent") {
        return el.parentElement;
    }
    if (isString(target)) {
        return qs(target);
    }
    return el; // itself
}

dynamicBehaviour(
    "[data-hx]",
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        const defaultTrigger = getDefaultTrigger(el);
        const defaultMethod = getDefaultMethod(el);
        const config = simpleConfig(el.dataset.hx);
        const trigger = config.trigger || defaultTrigger;
        const triggers = trigger.split(" ");
        const target = config.target;
        const swap = config.swap || "innerHTML";
        const method = (config.method || defaultMethod).toUpperCase();
        const url = config.url || getAttr(el, "href");
        const isDelaySet = config.delay > 0;
        const delay = toMs(config.delay || 300);
        const interval = toMs(config.interval);

        let controller = new AbortController();

        let fetchContent = async () => {
            if (controller) {
                // Abort any previous request
                // This shouldn't happen too much if the responses are fast and we debounce calls
                controller.abort();
            }
            controller = new AbortController();

            // Update controller ref in case the node get's removed and the request cancelled
            updateMapData(map, el, "controller", controller);

            // Resolve target
            const targetEl = resolveTarget(el, target);
            setAttr(targetEl, "aria-busy", "true");

            // Build headers @link https://htmx.org/docs/#request-headers
            const headers = {
                "HX-Current-URL": document.location.toString(),
                "HX-Request": "true",
                "HX-Target": targetEl.id,
                "HX-Trigger-Name": getAttr(el, "name"),
                "HX-Trigger": el.id,
            };

            // Make the request
            const urlObj = new URL(url, window.location.toString());
            if (el instanceof HTMLInputElement) {
                urlObj.searchParams.set(el.name, el.value);
            }
            const response = await fetch(urlObj, {
                method: method,
                signal: controller.signal,
                headers: headers,
            });

            // Process response headers @https://htmx.org/docs/#response-headers
            // no errors if jsconfig contains dom.iterable
            for (const [k, v] of response.headers) {
                switch (k.toLowerCase()) {
                    case "hx-redirect":
                    case "hx-location":
                        window.location.href = v;
                        break;
                }
            }

            try {
                const content = await response.text();

                // Inject content
                const html = ce("div");
                html.innerHTML = content;
                if (swap.includes("HTML")) {
                    targetEl[swap] = html.innerHTML;
                } else {
                    targetEl[swap](html.firstElementChild);
                }
            } catch (error) {
                console.error(error);
            }

            removeAttr(targetEl, "aria-busy");
        };

        // Pick fetch mode according to type of request
        if (triggers.includes("input") || isDelaySet) {
            //@ts-ignore
            fetchContent = debounce(fetchContent, delay);
        } else {
            //@ts-ignore
            fetchContent = debounceLeading(fetchContent);
        }

        // There is no "open" event in js, so we watch the open attribute and
        // trigger a custom event
        if (el.tagName === "DIALOG" && triggers.includes("dialogOpen")) {
            // observe changes on open attribute
            observeAttrs(el, ["open"], (dialog, oldValue) => {
                const open = oldValue === null;
                dispatch("dialogOpen", dialog, { open });
            });
        }

        const eventHandler = (event) => {
            if (url) {
                fetchContent();
            }
        };
        //@ts-ignore
        el.handleEvent = eventHandler;

        const allTriggers = [CUSTOM_EVENT].concat(triggers);
        on(allTriggers, el);
        map.set(el, allTriggers);

        // interval
        let intervalReference = null;
        if (interval > 0) {
            intervalReference = setInterval(() => {
                dispatch(CUSTOM_EVENT, el);
            }, interval);
        }

        const elData = {
            triggers: triggers,
            interval: intervalReference,
            controller: controller,
        };
        map.set(el, elData);
    },
    /**
     * @param {HTMLElement} el
     */
    (el) => {
        const elData = map.get(el);
        if (elData) {
            if (elData.triggers) {
                off(elData.triggers, el);
            }
            if (elData.interval) {
                clearInterval(elData.interval);
            }
            // Abort any pending request made by our node
            if (elData.controller) {
                elData.controller.abort();
                elData.controller = null;
            }
        }
    },
);
