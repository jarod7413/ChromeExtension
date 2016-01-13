/* See license.txt for terms of usage */

"use strict";

const { click, addNewLayer, waitForEvents, removeLayer } = require("./common.js");
const { closeTab } = require("sdk/tabs/utils");

/**
 * This test is responsible for verifying layer lock option.
 * The user can lock any layer using 'Lock' checkbox that is
 * available in Pixel Perfect popup panel. Locked layers can't
 * be dragged.
 */
exports["test Layer Lock"] = function(assert, done) {
  addNewLayer().then(config => {
    let popup = config.popup;
    let layer = config.layer;

    // Click on the 'Lock' checkbox.
    click(popup, "#pixel-perfect-lock");

    // Wait till the layer is modified on the backend.
    waitForEvents(popup, ["layer-modified"]).then(() => {
      // Get layer info from the backend.
      popup.front.getLayerInfo(layer.id).then(response => {
        assert.equal(response.content.box.lock, "true",
          "The layer must be locked");

        // Clean up
        removeLayer(popup, layer.id).then(() => {
          config.popup.destroy().then(() => {
            closeTab(config.tab);
            done();
          });
        });
      });
    });
  });
};

require("sdk/test").run(exports);
