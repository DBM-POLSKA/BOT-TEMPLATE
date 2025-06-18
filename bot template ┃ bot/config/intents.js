const { GatewayIntentBits } = require("discord.js");

const intentConfig = {
  guilds: true,
  guildMembers: true,
  guildModeration: true,
  guildEmojisAndStickers: true,
  guildIntegrations: true,
  guildWebhooks: true,
  guildInvites: true,
  guildVoiceStates: true,
  guildPresences: true,
  guildMessages: true,
  guildMessageReactions: true,
  guildMessageTyping: true,
  directMessages: true,
  directMessageReactions: true,
  directMessageTyping: true,
  messageContent: true,
  guildScheduledEvents: true,
  autoModerationConfiguration: true,
  autoModerationExecution: true,
};

const intents = [];

if (intentConfig.guilds) intents.push(GatewayIntentBits.Guilds);
if (intentConfig.guildMembers) intents.push(GatewayIntentBits.GuildMembers);
if (intentConfig.guildModeration)
  intents.push(GatewayIntentBits.GuildModeration);
if (intentConfig.guildEmojisAndStickers)
  intents.push(GatewayIntentBits.GuildEmojisAndStickers);
if (intentConfig.guildIntegrations)
  intents.push(GatewayIntentBits.GuildIntegrations);
if (intentConfig.guildWebhooks) intents.push(GatewayIntentBits.GuildWebhooks);
if (intentConfig.guildInvites) intents.push(GatewayIntentBits.GuildInvites);
if (intentConfig.guildVoiceStates)
  intents.push(GatewayIntentBits.GuildVoiceStates);
if (intentConfig.guildPresences) intents.push(GatewayIntentBits.GuildPresences);
if (intentConfig.guildMessages) intents.push(GatewayIntentBits.GuildMessages);
if (intentConfig.guildMessageReactions)
  intents.push(GatewayIntentBits.GuildMessageReactions);
if (intentConfig.guildMessageTyping)
  intents.push(GatewayIntentBits.GuildMessageTyping);
if (intentConfig.directMessages) intents.push(GatewayIntentBits.DirectMessages);
if (intentConfig.directMessageReactions)
  intents.push(GatewayIntentBits.DirectMessageReactions);
if (intentConfig.directMessageTyping)
  intents.push(GatewayIntentBits.DirectMessageTyping);
if (intentConfig.messageContent) intents.push(GatewayIntentBits.MessageContent);
if (intentConfig.guildScheduledEvents)
  intents.push(GatewayIntentBits.GuildScheduledEvents);
if (intentConfig.autoModerationConfiguration)
  intents.push(GatewayIntentBits.AutoModerationConfiguration);
if (intentConfig.autoModerationExecution)
  intents.push(GatewayIntentBits.AutoModerationExecution);

module.exports = intents;
