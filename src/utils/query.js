/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {string} id
 * @param {K} input (this is only used to help your ide knowing what is the return type)
 * @param {Document|HTMLElement} root
 * @returns {HTMLElementTagNameMap[K]|null}
 */
export function byId(id, input = null, root = document) {
    //@ts-ignore
    return root.getElementById(id);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {string} selector
 * @param {K} input (this is only used to help your ide knowing what is the return type)
 * @param {Document|HTMLElement} root
 * @returns {HTMLElementTagNameMap[K]|null}
 */
export function qs(selector, input = null, root = document) {
    return root.querySelector(selector);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {string} selector
 * @param {K} input (this is only used to help your ide knowing what is the return type)
 * @param {Document|HTMLElement} root
 * @returns {Array<HTMLElementTagNameMap[K]>}
 */
export function qsa(selector, input = null, root = document) {
    return Array.from(root.querySelectorAll(selector));
}
