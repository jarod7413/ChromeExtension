/* See license.txt for terms of usage */

"use strict";

module.metadata = {
  "stability": "stable"
};

const { Cu, Ci } = require("chrome");
const { Trace, TraceError } = require("firebug.sdk/lib/core/trace.js").get(module.id);
const { ToolboxChrome } = require("firebug.sdk/lib/toolbox-chrome.js");
const { Locale } = require("firebug.sdk/lib/core/locale.js");

// Pixel Perfect modules
const { StyleEditorOverlay } = require("./style-editor-overlay.js");
const { PixelPerfectToolboxOverlay } = require("./pixel-perfect-toolbox-overlay.js");
const { StartButton } = require("./start-button.js");
const { FirstRun } = require("./first-run.js");

// Localization files. All strings in the UI should be loaded from these
// files, so the entire extension can be localized into other languages.
Locale.registerStringBundle("chrome://pixelperfect/locale/toolbox.properties");
Locale.registerStringBundle("chrome://pixelperfect/locale/popup-panel.properties");
Locale.registerStringBundle("chrome://pixelperfect/locale/notification.properties");

/**
 * Entry point of the extension. Both 'main' and 'onUnload' methods are
 * exported from this module and executed automatically by Add-ons SDK.
 */
function main(options, callbacks) {
  Trace.sysout("main;", options);

  ToolboxChrome.initialize(options);

  ToolboxChrome.registerPanelOverlay(StyleEditorOverlay);
  ToolboxChrome.registerToolboxOverlay(PixelPerfectToolboxOverlay);

  StartButton.initialize(options);
  FirstRun.initialize(options);
}

/**
 * Executed on browser shutdown or when the extension is
 * uninstalled/removed/disabled.
 * @param reason
 */
function onUnload(reason) {
  Trace.sysout("onUnload; " + reason);

  ToolboxChrome.unregisterToolboxOverlay(PixelPerfectToolboxOverlay);
  ToolboxChrome.unregisterPanelOverlay(StyleEditorOverlay);

  StartButton.shutdown(reason);
  ToolboxChrome.shutdown(reason);
}

// Exports from this module
exports.main = main;
exports.onUnload = onUnload;
