// This plugin's manifest, read from the file the host loads.
//
// plugin.json is the one copy. A second declaration in TypeScript would compile
// and pass its own tests while the host read a different file — the drift is
// invisible from either side.
//
// The left sidebar slot is a contract address rather than a plugin name: a
// content view states that it needs a file tree beside it, and whichever plugin
// implements that contract fills the slot. With no implementer the slot is
// empty, which is a state the frame is defined for.
import declared from "../../plugin.json" with { type: "json" };

export const manifest = declared;
