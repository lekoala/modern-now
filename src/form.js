import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { getBoolData, getMixedBoolData, hasAttr, hasData, removeAttr, setAttr } from "./utils/attrs.js";
import { on, off } from "./utils/events.js";
import { getAttr } from "./utils/attrs.js";
import { as, ce, clearInputs, clearTo, dotPath, ephemeralText, globalContext, simpleConfig } from "./utils/misc.js";
import FormValidator from "./FormValidator.js";
import { qs, qsa } from "./utils/query.js";

const validators = new WeakMap();

const { HTML } = createRegistry(globalContext());
define(
    "form[data-ajax],form[data-validate]",
    class extends HTML.Form {
        connectedCallback() {
            on("submit", this);

            if (getMixedBoolData(this, "validate")) {
                validators.set(this, new FormValidator(this));
            }
        }

        disconnectedCallback() {
            off("submit", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        isAjax() {
            return hasData(this, "ajax");
        }

        /**
         * @param {SubmitEvent} ev
         * @returns {String}
         */
        getFormAction(ev) {
            const submitter = ev.submitter;
            // Original action could be stored in a data attribute
            const defaultAction = this.dataset.action || getAttr(this, "action");
            const submitAction = submitter && getAttr(submitter, "formAction");
            return submitAction || defaultAction;
        }

        /**
         * @param {SubmitEvent} ev
         * @returns {Promise<String>}
         */
        async handleAjax(ev) {
            ev.preventDefault();

            const data = this.dataset;
            const ajaxConfig = simpleConfig(data.ajax);
            if (data.ajaxTarget) {
                ajaxConfig.target = data.ajaxTarget;
            }
            if (data.ajaxHandler) {
                ajaxConfig.handler = data.ajaxHandler;
            }
            if (getBoolData(this, "ajaxReset")) {
                ajaxConfig.reset = true;
            }
            if (getBoolData(this, "ajaxClear")) {
                ajaxConfig.clear = true;
            }
            if (getBoolData(this, "ajaxRemove")) {
                ajaxConfig.remove = true;
            }

            const formData = new FormData(this);

            // Add canvas element as blobs png
            for (const canvas of Array.from(qsa("canvas", "canvas", this))) {
                const name = canvas.dataset.name;
                if (!name) {
                    continue;
                }
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
                formData.append(name, blob, `${name}.png`);
            }

            const response = await fetch(this.getFormAction(ev), {
                method: getAttr(this, "method"),
                body: formData,
            });

            const result = await response.text();

            let message = result;
            let processedResult = result;
            let error = false;

            // is json?
            if (result.indexOf("{") === 0) {
                try {
                    // Result will be passed processed
                    const json = JSON.parse(result);
                    processedResult = json;
                    // Use message key instead of result
                    message = json.message || "";
                    if (json.error) {
                        error = true;
                    }
                } catch (e) {
                    // show invalid message
                    message = e.message;
                    error = true;
                }
            }

            // target
            const target = ajaxConfig.target;
            if (target && message) {
                if (target === "this") {
                    this.outerHTML = message;
                } else if (target.includes("status")) {
                    const div = qs(target === "status" ? "div[aria-live][data-status]" : target, "div");
                    if (div) {
                        ephemeralText(div, message);
                    }
                } else {
                    const targetEl = document.getElementById(target);
                    if (targetEl) {
                        targetEl.innerHTML = message;
                    }
                }
            }

            // handler
            const handler = ajaxConfig.handler;
            if (handler) {
                const fn = dotPath(handler);
                if (fn) {
                    fn(processedResult, ev, this);
                }
            }

            if (ajaxConfig.reset) {
                this.reset();
            }

            if (ajaxConfig.clear) {
                this.reset();

                /** @type {Array<HTMLInputElement&HTMLSelectElement>} */
                //@ts-ignore
                const els = Array.from(this.elements);
                clearInputs(els);
            }

            if (ajaxConfig.remove) {
                this.remove();
            }

            return result;
        }

        /**
         * @param {SubmitEvent} ev
         */
        async $submit(ev) {
            const submitter = as(ev.submitter, "button");

            /** @type {FormValidator} */
            const validator = validators.get(this);
            const isAjax = this.isAjax();
            let isValid = true;

            let disabledTo = null;

            // If we have a validator or isAjax, the submit event will be prevented
            // This breaks some default behaviour like the action being set in POST
            // or the formaction attribute being handled natively
            if (validator || isAjax) {
                if (submitter) {
                    // Wrap in a timeout to avoid flashing during validation
                    disabledTo = setTimeout(() => {
                        setAttr(submitter, "disabled", "disabled");
                    }, 0);
                }
            }

            // Validate and return if invalid
            if (validator) {
                isValid = await validator.validate(ev);
            }
            if (!isValid) {
                clearTo(disabledTo);
                removeAttr(submitter, "disabled");
                return;
            }

            // Submit as a regular form or through ajax
            if (isAjax) {
                const result = await this.handleAjax(ev);
            } else {
                // Inject action just before submitting that would otherwise be missing
                if (submitter) {
                    // When going back, html could still be there due to browser state
                    const previousSubmitters = qsa("input[data-submitter]", "input", this);
                    for (const ps of previousSubmitters) {
                        ps.remove();
                    }
                    // Store
                    const h = ce("input", this);
                    h.dataset.submitter = "true";
                    h.type = "hidden";
                    h.name = submitter.name;
                    h.value = "true";

                    // Restore formaction button feature
                    const action = this.getFormAction(ev);
                    const thisAction = getAttr(this, "action");
                    if (action !== thisAction) {
                        this.dataset.action = thisAction;
                        setAttr(this, "action", action);
                    }
                }
                // No submit event is raised. In particular, the form's onsubmit event handler is not run.
                // Constraint validation is not triggered.
                this.submit();
            }

            if (submitter) {
                // Always remove disabled
                setTimeout(() => {
                    removeAttr(submitter, "disabled");
                }, 2000); // don't allow clicking like a mad man
            }
        }
    },
);
