import createRegistry from "nonchalance/ce";
import { define } from "nonchalance/selector";
import { on, off } from "./utils/events.js";
import { dataAsConfig, globalContext, simpleConfig, toInt } from "./utils/misc.js";
import { getData } from "./utils/attrs.js";

/**
 * @typedef FileConfig
 * @property {Number} minWidth
 * @property {Number} minHeight
 * @property {Number} maxWidth
 * @property {Number} maxHeight
 * @property {Array} imageRatio
 * @property {Number} targetRatio
 * @property {Number} quality
 */

const { HTML } = createRegistry(globalContext());
// https://github.com/lekoala/superfile
define(
    "input[type=file][data-resize]",
    class extends HTML.Input {
        connectedCallback() {
            on("change", this);
        }

        disconnectedCallback() {
            off("change", this);
        }

        handleEvent(ev) {
            this[`$${ev.type}`](ev);
        }

        $change(ev) {
            this.processFiles();
        }

        /**
         *
         * @returns {FileConfig}
         */
        config() {
            /** @type {FileConfig} */
            const config = simpleConfig(getData(this, "resize"));
            const data = this.dataset;

            // no prefix here
            dataAsConfig(this, config, ["minWidth", "minHeight", "maxWidth", "maxHeight", "ratio", "quality"]);

            // Make sure config data is valid and/or using defaults
            config.minWidth = toInt(config.minWidth) || 0;
            config.minHeight = toInt(config.minHeight) || 0;
            config.maxWidth = toInt(config.maxWidth) || 1920;
            config.maxHeight = toInt(config.maxHeight) || 1920;
            const imageRatio = data.ratio ? data.ratio.split(/\/|:/) : null;
            if (imageRatio) {
                config.imageRatio = imageRatio;
            }

            config.quality = toInt(config.quality) || 1;
            if (config.quality > 1) {
                config.quality = config.quality / 100;
            }
            config.targetRatio = 0;
            if (config.imageRatio) {
                config.targetRatio = toInt(config.imageRatio[0]) / toInt(config.imageRatio[1]);
            }

            return config;
        }

        /**
         * @param {File} file
         * @param {HTMLImageElement} img
         * @returns {void}
         */
        resizeImage(file, img) {
            const config = this.config();

            const sw = img.naturalWidth || img.width;
            const sh = img.naturalHeight || img.height;
            // Validate
            this.setCustomValidity("");
            if (sw < config.minWidth || sh < config.minHeight) {
                this.setCustomValidity("invalid_size");
                this.value = null;
                return;
            }

            let sx = 0;
            let sy = 0;
            let cropWidth = sw;
            let cropHeight = sh;
            let width = sw;
            let height = sh;
            const needResize = width > config.maxWidth || height > config.maxHeight;
            const currentRatio = width / height;
            const targetRatio = config.targetRatio || currentRatio;
            const needCrop = currentRatio !== targetRatio;

            // No resize needed
            if (!needResize && !needCrop) {
                return;
            }

            // Crop to ratio
            if (needCrop) {
                if (currentRatio > targetRatio) {
                    width = height * targetRatio;
                } else if (currentRatio < targetRatio) {
                    height = width / targetRatio;
                }
                sx = (sw - width) / 2;
                sy = (sh - height) / 2;
            }

            // Resize (preserve ratio). Target width/height cannot be above max
            if (width > config.maxWidth) {
                cropWidth *= config.maxWidth / width;
                cropHeight *= config.maxWidth / width;

                height *= config.maxWidth / width;
                width = config.maxWidth;
            }
            if (height > config.maxHeight) {
                cropWidth *= config.maxHeight / height;
                cropHeight *= config.maxHeight / height;

                width *= config.maxHeight / height;
                height = config.maxHeight;
            }

            // Use exact target width
            width = Math.round(width);
            height = Math.round(height);

            // Create a canvas at the target size with the right ratio
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            if (needCrop) {
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cropWidth, cropHeight);
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }

            // @link https://caniuse.com/mdn-api_htmlcanvaselement_toblob
            const processHandler = (blob) => {
                this.createProcessedFile(file, blob);
            };
            ctx.canvas.toBlob(processHandler, file.type, config.quality);
        }

        /**
         * @param {File} file
         */
        handleResizeImage(file) {
            // Only applies to images
            if (!file.type.match(/image.*/)) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                // We need to wait until image is loaded
                // Otherwise size is not set
                img.onload = () => {
                    this.resizeImage(file, img);
                };
                img.onerror = (ev) => {
                    // Maybe the image format is not supported
                };
                //@ts-ignore yes, it's a string
                img.src = ev.target.result;
            };
            reader.onerror = (ev) => {
                console.log(ev);
            };
            reader.readAsDataURL(file);
        }

        /**
         * This will rotate the file and drop exif metadata
         * @param {File|Object} file we use type and name properties
         * @param {Blob} blob
         */
        createProcessedFile(file, blob) {
            const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
            });

            // We cannot manipulate the FileList directly
            // @link https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
            const container = new DataTransfer();
            for (let i = 0; i < this.files.length; i++) {
                const fileItem = this.files[i];
                if (fileItem.name === file.name) {
                    container.items.add(resizedFile);
                } else {
                    container.items.add(fileItem);
                }
            }
            // It's a new file
            if (!file.lastModified) {
                container.items.add(resizedFile);
            }
            this.files = container.files;
        }

        processFiles() {
            const files = this.files;
            if (!files.length) {
                return;
            }
            for (let i = 0; i < files.length; i++) {
                this.handleResizeImage(files[i]);
            }
        }
    },
);
