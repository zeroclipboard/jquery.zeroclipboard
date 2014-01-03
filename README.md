# jquery.zclip

jQuery plugin that creates a handful of bindable special events for copying text to the clipboard [using [ZeroClipboard](http://zeroclipboard.org/)] upon `click`: `beforeCopy`, `copy`, and `afterCopy`.


## API

In order for the `jquery.zclip` functionality to be hooked up, you _**MUST**_  bind a handler for either `beforeCopy` or `copy` on a selected element set.

### Basic Examples

Using the HTML5 Clipboard API:

```js
jQuery(document).ready(function($) {
  $("body")
    .on("copy", ".zclip", function(/* ClipboardEvent */ e) {
      e.clipboardData.setData("text/plain", $(this).data("zclip-text"));
    })
    .on("afterCopy", ".zclip", function(e) {
      if (e.clipboardData.didSucceed("text/plain")) {
        alert("Successfully copied text into the clipboard!");
      }
      else {
        alert("Failed to copy text into the clipboard....");
      }
    });
```
