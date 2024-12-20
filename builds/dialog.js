/**
 * Modern now - dialog build
 * Modern now/github.com/lekoala/modern-now
 * @license MIT
 */

import addDialogPolyfill from "../src/addDialogPolyfill.js";
import "../src/button-dialog.js";

// Add dialog polyfill if needed
// You can drop this if you target safari >= 15.4
addDialogPolyfill();
