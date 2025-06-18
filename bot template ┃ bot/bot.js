//------------------------------------------------------------
//
//region General Imports
//
//------------------------------------------------------------

const BOT = {};
const DiscordJS = require("discord.js");
const { Client } = require("discord.js");
const betterConsole = require("better-console-s");
const fs = require("fs");
const path = require("path");

BOT.botVersion = "1.0.0";
BOT.requiredDJSVersion = "14.20.0";
BOT.DJSVersion = DiscordJS.version;
const settings = require("./config/settings.json");
const settingsPath = path.join(__dirname, "config", "settings.json");
const intents = require("./config/intents.js");
const partials = require("./config/partials.js");

BOT.client = new Client({
  intents: intents,
  partials: partials,
});

//------------------------------------------------------------
//
//region Handlers
//
//------------------------------------------------------------

const commandHandler = require("./lib/handlers/commands");
const eventHandler = require("./lib/handlers/events");
const interactionHandler = require("./lib/handlers/interaction_create.js");
const messageHandler = require("./lib/handlers/message_create.js");

interactionHandler(BOT.client, BOT);
messageHandler(BOT.client, BOT);
eventHandler(BOT.client, BOT);
commandHandler(BOT.client, BOT);
require("./lib/modules/index.js");

//------------------------------------------------------------
//
//region Client
//
//------------------------------------------------------------

BOT.client.once("ready", () => {
  /////
  const welcome = betterConsole(`${BOT.client.user.username}`, {
    borderStyle: "doubleRounded",
    borderColor: "blue",
    textColor: "green",
    paddingLeft: 1,
    paddingRight: 1,
  });
  console.log(welcome);
  /////
});

//------------------------------------------------------------
//
//region Settings Update
//
//------------------------------------------------------------

BOT.client.once("ready", async () => {
  const guildIds = BOT.client.guilds.cache.map((g) => g.id);
  const botName = BOT.client.user.username;
  const avatar = BOT.client.user.avatar;
  const id = BOT.client.user.id;

  settings.guilds = guildIds;
  settings.botName = botName;
  settings.botAvatarUrl = `https://cdn.discordapp.com/avatars/1384691414947860612/${avatar}.png?size=1024`;
  settings.discordDeveloperPortal = `https://discord.com/developers/applications/${id}/information`;

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
});

BOT.client.login(settings.token);

global.BOT = BOT;
module.exports = BOT;
