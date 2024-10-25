/**
 * Modern html
 * https://github.com/lekoala/modern-now
 * @license MIT
 */

import addDialogPolyfill from "./src/addDialogPolyfill.js";
import "./src/behaviour.js";
import "./src/button-dialog.js";
import "./src/button-toggle.js";
import "./src/button-dropdown.js";
import "./src/input.js";
import "./src/input-file.js";
import "./src/input-toggle.js";
import "./src/input-password.js";
import "./src/form.js";
import "./src/textarea-autogrow.js";
import "./src/time-datetime.js";
import "./src/span-number.js";
import "./src/mark-animated.js";
import "./src/tooltip.js";
import "./src/htmx.js";

// Add dialog polyfill if needed
// You can drop this if you target safari >= 15.4
addDialogPolyfill();
