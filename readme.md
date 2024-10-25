Dynamically import polyfills to support

## Popover

Backdrop may not be supported by all browsers. Use a dialog instead if needed.

Sample css for open popovers:

```css
/* You need two distinct declaration because otherwise an invalid declaration invalidates all rules */
[popover]:popover-open {
}
[popover].\:popover-open {
}
```

https://github.com/oddbird/popover-polyfill

## Dialog

Dialog are dynamically registered using qsa-observer if needed.

Sample css for backdrop:

```css
dialog::backdrop {
  /* native */
  background-color: green;
}
dialog + .backdrop {
  /* polyfill */
  background-color: green;
}
```

https://github.com/GoogleChrome/dialog-polyfill

## Browser Support

Basically anything supporting module and [dynamic imports](https://caniuse.com/es6-module-dynamic-import)

Firefox 67+ (2019-05)
Chrome 63+ (2017-12)
Edge 79+ (2020-01)
Safari 11.1+ (2018-29)
