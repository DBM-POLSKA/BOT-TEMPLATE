module.exports = {
  enabled: true, // should the command be registered
  name: "test", // command name
  description: "test 123", // command description
  type: "slash", // command type (text / slash / user-menu / msg-menu)
  permissions: [], // user required permissions
  botPermissions: [], // bot required permissions
  commandRestriction: "none", // where you can use the command (none / server / owner / dm / botOwners)

  // prefix: "?", // text command prefix
  //  aliases: [], // text command aliases

  slashCommandType: 0, // (0 = auto / 1 = global / 2 = for all servers / 3 = for selected servers / 4 = for all servers and ignore selected servers)
  // guilds: [],
  options: [], //

  // code executed after command execution
  async action(interaction) {
    await interaction.reply(`test`);
  },

  // code executed after starting the bot
  botInit() {},

  // code executed in case of interaction (buttons and select menus can be handled here)
  async interaction() {},
};
