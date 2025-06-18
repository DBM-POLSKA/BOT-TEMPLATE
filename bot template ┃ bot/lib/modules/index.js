const { console_colors } = require("./colors/console_colors");
const { rgb_colors } = require("./colors/hex_colors");

global.wait = require("./functions/wait");

global.getOptionsObject = require("./functions/get_options_object");

module.exports = { console_colors, rgb_colors };
