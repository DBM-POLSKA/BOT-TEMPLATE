const { Partials } = require("discord.js");

const partialConfig = {
  message: true,
  channel: true,
  reaction: true,
  guildMember: true,
  user: true,
  threadMember: true,
  guildScheduledEvent: true,
};

const partials = [];

if (partialConfig.message) partials.push(Partials.Message);
if (partialConfig.channel) partials.push(Partials.Channel);
if (partialConfig.reaction) partials.push(Partials.Reaction);
if (partialConfig.guildMember) partials.push(Partials.GuildMember);
if (partialConfig.user) partials.push(Partials.User);
if (partialConfig.threadMember) partials.push(Partials.ThreadMember);
if (partialConfig.guildScheduledEvent)
  partials.push(Partials.GuildScheduledEvent);

module.exports = partials;
