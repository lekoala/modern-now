import { addClass, getBoolData, hasAttr, hasClass, removeClass, setAttr } from "../utils/attrs.js";
import { on } from "../utils/events.js";
import { checkVisibility, dataAsConfig, ephemeralText, simpleConfig } from "../utils/misc.js";
import { qs, qsa } from "../utils/query.js";
import { ucfirst } from "../utils/str.js";

/**
 * @typedef ValidatorConfig
 * @property {String} message
 * @property {String} messageTarget
 */

const INVALID_CLASS = "is-invalid";
const NOVALIDATE = "novalidate";
const WAS_VALIDATED_CLASS = "was-validated";

// extend built in rules: required, minlength & maxlength, min and max, type, pattern
const rules = {
    checkValidity: (v, el) => {
        return el.checkValidity();
    },
    ajax: async (v, el, options) => {
        // Don't trigger if required and no value
        if (hasAttr(el, "required") && v.length === 0) {
            return false;
        }

        const url = options.default || options.url;
        const extra = options.extra;
        const urlObj = new URL(url);

        // pass its name and value + always q
        if (el instanceof HTMLInputElement) {
            urlObj.searchParams.set("q", el.value);
            if (el.name) {
                urlObj.searchParams.set(el.name, el.value);
            }
        }

        // combo with another element
        if (extra) {
            const extraEl = qs(extra, "input", el.form);
            if (extraEl instanceof HTMLInputElement && extraEl.name) {
                urlObj.searchParams.set(extraEl.name, extraEl.value);
            }
        }
        const res = await fetch(urlObj, {
            method: "POST",
        });

        // it's an error
        if (res.status >= 400) {
            return false;
        }

        // it's a 2xx response, but maybe containing a json with an error
        const content = await res.text();
        if (content.startsWith("{")) {
            const json = JSON.parse(content);
            if (json.error) {
                return false;
            }
        }

        return true;
    },
    same: (v, el, opts) => {
        const selector = opts.default || opts.selector;
        const target = qs(selector, "input");
        return target && v === target.value;
    },
    number: (v) => {
        // accepts decimal separators, eg 1.25
        return v.length === 0 || !Number.isNaN(+v);
    },
    digits: (v) => {
        // don't accept decimal separators
        return v.length === 0 || /^\d+$/.test(v);
    },
    alnum: (v) => {
        return v.length === 0 || /^[a-z0-9]+$/i.test(v);
    },
};
/**
 * @param {HTMLInputElement} field
 * @returns {Boolean}
 */
function ignoreField(field) {
    return field.disabled || field.readOnly || ["reset", "submit", "button"].includes(field.type);
}

/**
 *
 * @param {HTMLInputElement} el
 * @param {string} n
 * @param {Object} opts
 * @returns {Promise<Boolean>|Boolean}
 */
function checkRule(el, n, opts = {}) {
    const h = rules[n];
    if (!h) {
        throw `Invalid rule ${n}`;
    }
    return h(el.value, el, opts);
}

/**
 *
 * @param {HTMLInputElement} el
 * @returns {Promise<Boolean>}
 */
async function checkRules(el) {
    // Reset HTML5 validity state
    el.setCustomValidity("");

    const data = el.dataset;
    const failed = [];
    for (const ruleName of Object.keys(rules)) {
        const ruleData = el.dataset[`validate${ucfirst(ruleName)}`];
        if (ruleName !== "checkValidity" && ruleData === undefined) {
            continue;
        }
        const opts = simpleConfig(ruleData);
        let result = checkRule(el, ruleName, opts);
        if (result instanceof Promise) {
            result = await result;
        }
        if (!result) {
            failed.push(ruleName);
        }
    }

    const valid = failed.length === 0;
    const errors = failed.join(",");
    if (errors || data.validateErrors) {
        data.validateErrors = errors;
    }

    if (valid) {
        removeClass(el, INVALID_CLASS);
    } else {
        // this will make the element :invalid, we don't use reportValidity in favor of custom ui
        el.setCustomValidity(errors);
        addClass(el, INVALID_CLASS);
    }

    return valid;
}

/**
 *
 * @param {HTMLInputElement} el
 * @param {string} trigger
 */
async function validateField(el, trigger) {
    const form = el.form;
    if (!form) {
        return;
    }
    const data = el.dataset;
    const validationTrigger = data.validateTrigger ? data.validateTrigger.split(",") : [];
    const validate =
        trigger === "submit" ||
        (validationTrigger.includes(trigger) && el.value.length > 0) ||
        hasClass(el, INVALID_CLASS) ||
        data.validateErrors !== "";

    if (validate && !ignoreField(el)) {
        const isValid = await checkRules(el);

        // Optional: we may use a tooltip to display validation message
        const validateTooltip = getBoolData(el, "validateTooltip");

        // It's valid
        if (isValid) {
            // Hide tooltip since it's valid
            if (validateTooltip) {
                el.dataset.tooltipHidden = "true";
            }
        } else {
            // Show error as tooltip
            if (validateTooltip) {
                el.dataset.tooltipHidden = "false";
            }

            // If not visible, we should mark the next visible parent as invalid
            if (!checkVisibility(el)) {
                let parent = el.parentElement;
                while (parent && !checkVisibility(parent)) {
                    parent = parent.parentElement;
                }
                if (parent) {
                    addClass(parent, INVALID_CLASS);
                }
            }
        }
    }
}

on("focusout", (event) => {
    //@ts-ignore
    validateField(event.target, "blur");
});

// Triggers validation if it has a invalid class or a keydown trigger
on("input", (event) => {
    //@ts-ignore
    validateField(event.target, "input");
});

/**
 * Validation using Constraint validation API
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
 * @link https://getbootstrap.com/docs/5.3/forms/validation/
 */
class FormValidator {
    /**
     * @param {HTMLFormElement} form
     */
    constructor(form) {
        this.form = form;

        const data = form.dataset;

        /** @type {ValidatorConfig} */
        this.config = simpleConfig(data.validate);
        dataAsConfig(form, this.config, ["message", "messageTarget"], "validate");

        // Make sure we don't use native validation
        if (!hasAttr(form, NOVALIDATE)) {
            setAttr(form, NOVALIDATE, "");
        }

        // Hide all validation tooltips until validation
        for (const input of qsa("[data-validate-tooltip]", "input", form)) {
            input.dataset.tooltipHidden = "true";
        }
    }

    /**
     * @param {SubmitEvent} event
     * @returns {Promise<Boolean>}
     */
    async validate(event) {
        const form = this.form;

        // Always prevent the form submission
        event.preventDefault();
        event.stopPropagation();

        // Remove invalid class in accordion or parents div
        for (const parent of qsa(`.${INVALID_CLASS}`, "details", form)) {
            removeClass(parent, INVALID_CLASS);
        }

        // Show all invalid fields
        const els = Array.from(form.elements);

        for (const el of els) {
            //@ts-ignore
            await validateField(el, "submit");
        }

        // If the form is invalid
        if (!form.checkValidity()) {
            // Optional integration with pop-notify or to nearest data-status node
            const message = this.config.message;
            if (message) {
                const statusTarget = this.config.messageTarget || "div[aria-live][data-status]";
                const div = qs(statusTarget, "div");
                if (div) {
                    ephemeralText(div, message);
                }
            }

            // Focus first visible invalid element
            const firstInvalid = qs(":invalid", "input", form);
            if (firstInvalid) {
                //@ts-ignore
                firstInvalid.focus();
                firstInvalid.style.scrollMarginTop = "16px";
                firstInvalid.scrollIntoView();
            }
        }

        addClass(form, WAS_VALIDATED_CLASS);

        return form.checkValidity();
    }

    /**
     * @param {string} n
     * @param {Function} callback
     */
    static registerRule(n, callback) {
        rules[n] = callback;
    }
}

export default FormValidator;
