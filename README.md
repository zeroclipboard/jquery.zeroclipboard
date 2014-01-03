[![Build Status](https://travis-ci.org/JamesMGreene/jquery.zeroclipboard.png)](https://travis-ci.org/JamesMGreene/jquery.zeroclipboard)

# jquery.zeroclipboard

Bind to the `beforeCopy`, `copy`, and `afterCopy` events, custom DOM-like events generated using jQuery's Special Events API. In order for the clipboard injection functionality to be hooked up [using [ZeroClipboard](http://zeroclipboard.org/)], you _**MUST**_  bind a handler for either `beforeCopy` or `copy` on the selected element set.

The `beforeCopy` and `copy` events trigger when the user clicks on a bound element.

The `afterCopy` event triggers after the clipboard injection has been attempted, regardless of whether or not the injection succeeded.

The `click` event will also be bubbled after the `afterCopy` event handlers have all been triggered or stopped.


## Prerequisites

ZeroClipboard requires the use of Flash Player 10.0.0 or higher. See [ZeroClipboard](https://github.com/zeroclipboard/zeroclipboard) for more details about the underlying mechanism.

This plugin's functionality is made possible by the smart default configurations values made in ZeroClipboard, plus overriding two options:

```js
ZeroClipboard.config({
  // Disables debugging `console` messages with deprecation warnings, etc.
  // This is not strictly necessary but provides a better experience for downstream consumers.
  debug: false,

  // Disabling allows the plugin to handle calling `ZeroClipboard.activate(...);` itself so that
  // we can take advantage of jQuery's delegated `mouseover` event handlers rather than relying
  // on ZeroClipboard's direct (per-element) `mouseover` event handlers.
  autoActivate: false
});
```


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
        e.clipboardData.clearData();
        e.clipboardData.setData("text/plain", $(this).data("zclip-text"));
        e.preventDefault();
      });
  });
</script>
<button class="zclip" data-zclip-text="Testing 1-2-3!">Click to copy!</button>
```


## Examples

Offers an API similar to the HTML5 Clipboard API.
_Note:_ Some of these examples will also be leveraging the [jQuery.Range plugin](http://jquerypp.com/#range) where noted.

### Example 1: Using `beforeCopy`

The following example uses the `beforeCopy` event to change the selected text before it is copied. The modified selection is what will be copied into the clipboard if the action is not prevented.

```js
jQuery(document).ready(function($) {
  $("body").on("beforeCopy", ".zclip", function() {
    // Select the text of this element; this will be copied by default
    $("#textToCopy").range().select();  // ** Using the jQuery.Range plugin
  });
});
```


### Example 2: Using `copy`

The following example uses the `copy` event to set data into several different clipboard sectors.

```js
jQuery(document).ready(function($) {
  $("body").on("copy", ".zclip", function(/* ClipboardEvent */ e) {
    // Get the currently selected text
    var textToCopy = $.Range.current().toString();  // ** Using the jQuery.Range plugin
    
    // If there isn't any currently selected text, just ignore this event
    if (!textToCopy) {
      return;
    }
    
    // Clear out any existing data in the pending clipboard transaction
    e.clipboardData.clearData();

    // Set your own data into the pending clipboard transaction
    e.clipboardData.setData("text/plain", textToCopy);
    e.clipboardData.setData("text/html", "<b>" + textToCopy + "</b>");
    e.clipboardData.setData("application/rtf", "{\\rtf1\\ansi\n{\\b " + textToCopy + "}}");
    e.clipboardData.setData("text/x-markdown", "**" + textToCopy + "**");
    
    // Prevent the default action of copying the currently selected text into the clipboard
    e.preventDefault();
  });
});
```

### Example 3: Using `afterCopy`

This is the same as [Example #1](#example-1-using-beforecopy), except that it also uses the `afterCopy` event to "celebrate".

```js
jQuery(document).ready(function($) {
  var eventsMap = {
    "beforeCopy": function() {
      // Select the text of this element; this will be copied by default
      $("#textToCopy").range().select();  // ** Using the jQuery.Range plugin
    },
    "afterCopy": function(/* afterCopyEvent */ e) {
      // NOTE: The `afterCopyEvent` event interface is not based on any existing DOM event, so the event model
      // is still just a draft version. If you have any suggestions, please submit a new issue in this repo!
      if (e.clipboardData.status("text/plain") === true) {
        alert("Copy succeeded. Yay!");
      }
      else {
        alert("Copy failed... BOOOOOO!!!");
      }
    }
  };
  $("body").on(eventsMap, ".zclip");
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
