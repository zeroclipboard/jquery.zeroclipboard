/*global QUnit:false */

(function($, module, test) {
  "use strict";


  module("jQuery#zeroclipboard");

  test("Should exist", function(assert) {
    assert.expect(3);

    assert.ok($.event.special.beforecopy);
    assert.ok($.event.special.copy);

    assert.strictEqual($.event.special.aftercopy, undefined);
  });

})(jQuery, QUnit.module, QUnit.test);
