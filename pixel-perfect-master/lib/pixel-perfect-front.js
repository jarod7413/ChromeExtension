/* See license.txt for terms of usage */

"use strict";

module.metadata = {
  "stability": "stable"
};

const { Cc, Ci, Cu } = require("chrome");
const { Trace, TraceError } = require("firebug.sdk/lib/core/trace.js").get(module.id);
const { PixelPerfectActor } = require("./pixel-perfect-actor.js");
const Events = require("sdk/event/core");

const { devtools } = require("firebug.sdk/lib/core/devtools.js");
const { Front, FrontClass } = devtools["require"]("devtools/server/protocol");

/**
 * @front This object represents a client side (a proxy) for logic
 * running on the debuggee target (backend). This backend logic is
 * implemented by {@link PixelPerfectActor} and injected to the backend
 * through RDP.
 *
 * This client also handles events sent by the backend actor such as
 * information about new position when dragged by the user.
 */
var PixelPerfectFront = FrontClass(PixelPerfectActor,
/** @lends PixelPerfectFront */
{
  // Initialization

  initialize: function(client, form) {
    Front.prototype.initialize.apply(this, arguments);

    Trace.sysout("PixelPerfectFront.initialize;", this);

    this.actorID = form[PixelPerfectActor.prototype.typeName];
    this.manage(this);
  },

  onAttached: function(response) {
    Trace.sysout("PixelPerfectFront.onAttached; ", response);
  },

  onDetached: function(response) {
    Trace.sysout("PixelPerfectFront.onDetached; ", response);
  },
});

// Exports from this module
exports.PixelPerfectFront = PixelPerfectFront;
