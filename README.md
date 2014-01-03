# jquery.zclip

jQuery plugin that creates a handful of bindable special events for copying text to the clipboard upon click: "beforeCopy", "copy", and "afterCopy".


## API

```js
$(document).ready(function() {
  $(document)
    .on("beforeCopy", function(beforeCopyEvent) {
      
    })
    .on("copy", function(copyEvent) {
      
    })
    .on("afterCopy", function(afterCopyEvent) {
      
    });
```
