> HTML as it should be

README is work in progress, check the demos

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
