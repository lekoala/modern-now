/**
 * @link https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * @param {string} str
 * @returns {string}
 */
export function normalize(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, ""); // Remove accents, https://caniuse.com/mdn-javascript_regular_expressions_unicode_character_class_escape
}

/**
 * @link https://ricardometring.com/javascript-replace-special-characters
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
    return normalize(str)
        .replace(/([^\w]+|\s+)/g, "-") // Replace space and other characters by hyphen
        .replace(/\-\-+/g, "-") // Replaces multiple hyphens by one hyphen
        .replace(/(^-+|-+$)/g, "") // Remove extra hyphens from beginning or end of the string
        .toLowerCase();
}

/**
 * @param {string} str
 * @returns {string}
 */
export function dashToCamel(str) {
    return str
        .toLowerCase()
        .split("-")
        .reduce((a, b) => a + ucfirst(b));
}

/**
 * @param {string} str
 * @returns {string} A lowercased dash-string
 */
export function camelToDash(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * @param {string} str
 * @returns {string}
 */
export function ucfirst(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

/**
 * @param {string} str
 * @returns {string}
 */
export function strToUpper(str) {
    if (!str) {
        return "";
    }
    return str.toLocaleUpperCase();
}

/**
 * @param {string} str
 * @returns {string}
 */
export function removeSpaces(str) {
    return str.replace(/\s/g, "");
}

/**
 * @param {string} str
 * @returns {string}
 */
export function removeUnicode(str) {
    return str.replace(/[\u{0080}-\u{FFFF}]/gu, "");
}

/**
 * @link https://stackoverflow.com/questions/31439604/how-to-convert-persian-and-arabic-digits-of-a-string-to-english-using-javascript#answer-70635474
 * @param {string} str
 * @returns {string}
 */
export function enDigits(str) {
    //@ts-ignore
    return str.replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);
}
