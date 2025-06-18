const { PermissionsBitField } = require("discord.js");
const settings = require("../../config/settings.json");
const messages = require("../../config/messages.json");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;

    const allCommands = [...client.commands.text.values()];

    for (const command of allCommands) {
      const cmdPrefix = command.prefix || settings.prefix;

      if (!message.content.startsWith(cmdPrefix)) continue;

      const contentWithoutPrefix = message.content
        .slice(cmdPrefix.length)
        .trim();
      const [cmdName, ...args] = contentWithoutPrefix.split(/\s+/);
      const input = cmdName.toLowerCase();

      const commandName = command.name.toLowerCase();
      const aliases = Array.isArray(command.aliases)
        ? command.aliases.map((a) => a.toLowerCase())
        : [];

      if (input !== commandName && !aliases.includes(input)) continue;

      // Sprawdzanie uprawnień
      const requiredPerms = Array.isArray(command.permissions)
        ? command.permissions
        : [];

      const member = message.member;
      const hasAllPermissions = requiredPerms.every((perm) =>
        member.permissions.has(PermissionsBitField.Flags[perm])
      );

      if (!hasAllPermissions) {
        return message.reply(`${messages.invalidPermissionsResponse}`);
      }

      // Sprawdzanie restrykcji
      const restriction = command.commandRestriction || "none";

      if (restriction === "server" && !message.guild) {
        return message.reply(`${messages.guildOnlyCommandResponse}`);
      }

      if (restriction === "dm" && message.guild) {
        return message.reply(`${messages.dmOnlyCommandResponse}`);
      }

      if (restriction === "owner") {
        const guildOwnerId = message.guild?.ownerId;
        if (message.author.id !== guildOwnerId) {
          return message.reply(`${messages.ownerOnlyCommandResponse}`);
        }
      }

      if (restriction === "botOwners") {
        if (!settings.owners?.includes(message.author.id)) {
          return message.reply(`${messages.botOwnerOnlyCommandResponse}`);
        }
      }

      const botRequiredPerms = Array.isArray(command.botPermissions)
        ? command.botPermissions
        : [];

      const botMember = message.guild.members.me;

      if (botRequiredPerms.length > 0) {
        const botHasPerms = botRequiredPerms.every((perm) =>
          botMember.permissions.has(PermissionsBitField.Flags[perm])
        );

        if (!botHasPerms) {
          return message.reply(`${messages.invalidBotPermissionsResponse}`);
        }
      }

      try {
        await command.action(message, args);
      } catch (err) {
        await message.reply(`${messages.invalidCommandResponse}`);
      }

      break; // wykonano komendę — przerywamy dalsze sprawdzanie
    }
  });
};
