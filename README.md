[![Build Status](https://travis-ci.org/JamesMGreene/jquery.zeroclipboard.png)](https://travis-ci.org/JamesMGreene/jquery.zeroclipboard)

# jquery.zeroclipboard

Bind to the `beforeCopy`, `copy`, and `afterCopy` events, custom DOM-like events generated using jQuery's Special Events API. In order for the clipboard injection functionality to be hooked up [using [ZeroClipboard](http://zeroclipboard.org/)], you _**MUST**_  bind a handler for either `beforeCopy` or `copy` on the selected element set.

The `beforeCopy` and `copy` events trigger when the user clicks on a bound element.

The `afterCopy` event triggers after the clipboard injection has been attempted, regardless of whether or not the injection succeeded.

The `click` event will also be bubbled after the `afterCopy` event handlers have all been triggered or stopped.


## Prerequisites

ZeroClipboard requires the use of Flash Player 10.0.0 or higher.

See [ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard) for more details about the underlying mechanism.


## Getting Started
Check the [jQuery Plugins Registry](http://plugins.jquery.com/zeroclipboard/) for the latest published version of this plugin!

You can also download the [production version][min] or the [development version][max] from GitHub. You will also need a [ZeroClipboard v2.x SWF][swf].

[min]: https://raw.github.com/JamesMGreene/jquery.zeroclipboard/master/dist/jquery.zeroclipboard.min.js
[max]: https://raw.github.com/JamesMGreene/jquery.zeroclipboard/master/dist/jquery.zeroclipboard.js
[swf]: https://raw.github.com/JamesMGreene/jquery.zeroclipboard/master/dist/ZeroClipboard.swf

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.zeroclipboard.min.js"></script>
<script>
  jQuery(document).ready(function($) {
    $("body")
      .on("copy", ".zclip", function(/* ClipboardEvent */ e) {
        e.clipboardData.setData("text/plain", "Testing 1-2-3!");
      });
  });
</script>
```


## Examples

Using an API similar to the HTML5 Clipboard API:

```js
jQuery(document).ready(function($) {
  $("body")
    .on("copy", ".zclip", function(/* ClipboardEvent */ e) {
      // Set your own data into the pending clipboard transaction
      e.clipboardData.setData("text/plain", $(this).data("zclip-text"));
      // Prevent the default action of copying selected text into the clipboard
      e.preventDefault();
    })
    .on("afterCopy", ".zclip", function(e) {
      if (e.clipboardData.didSucceed("text/plain")) {
        alert("Successfully copied text into the clipboard!");
      }
      else {
        alert("Failed to copy text into the clipboard....");
      }
    });
});
```


## Compatibility
**Works 100% with jQuery versions:**  
 - 1.7.x and above

**Untested jQuery versions:**  
 - Anything below 1.7.x (incompatible jQuery Special Events API)


## Documentation
_(Coming soon)_


## Release History
 - 0.0.0: Published to the jQuery Plugins Registry on 2014-XX-XX
     - Initial release.
