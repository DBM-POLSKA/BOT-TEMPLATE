const messages = require("../../config/messages.json");

function attachAutoReply(interaction) {
  interaction.autoReply = async (
    key = "defaultSlashCommandResponse",
    ...args
  ) => {
    if (interaction.replied || interaction.deferred) return;
    let content = messages[key] || key;
    args.forEach((arg) => {
      content = content.replace("%s", arg);
    });
    await interaction.reply({ content, flags: 64 });
  };
}

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction || typeof interaction.reply !== "function") return;

    try {
      attachAutoReply(interaction);

      // Obsługa slash, user menu i message menu
      if (
        interaction.isChatInputCommand() ||
        interaction.isUserContextMenuCommand() ||
        interaction.isMessageContextMenuCommand()
      ) {
        let commandType = null;

        if (interaction.isChatInputCommand()) commandType = "slash";
        else if (interaction.isUserContextMenuCommand()) commandType = "user";
        else if (interaction.isMessageContextMenuCommand())
          commandType = "message";

        const command = client.commands?.[commandType]?.get(
          interaction.commandName
        );
        if (command && typeof command.action === "function") {
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////

          // Sprawdzanie restrykcji
          const restriction = command.commandRestriction || "none";

          if (restriction === "server" && !interaction.guild) {
            return await interaction.reply({
              content: messages.guildOnlyCommandResponse,
              flags: 64,
            });
          }

          if (restriction === "dm" && interaction.guild) {
            return await interaction.reply({
              content: messages.dmOnlyCommandResponse,
              flags: 64,
            });
          }

          if (restriction === "owner") {
            if (
              !interaction.guild ||
              interaction.user.id !== interaction.guild.ownerId
            ) {
              return await interaction.reply({
                content: messages.ownerOnlyCommandResponse,
                flags: 64,
              });
            }
          }

          if (restriction === "botOwners") {
            const botOwners = Array.isArray(settings.owners)
              ? settings.owners
              : [];
            if (!botOwners.includes(interaction.user.id)) {
              return await interaction.reply({
                content: messages.botOwnerOnlyCommandResponse,
                flags: 64,
              });
            }
          }

          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////

          if (command.permissions && command.permissions.length > 0) {
            if (
              !interaction.member ||
              !interaction.member.permissions.has(command.permissions)
            ) {
              return await interaction.reply({
                content: `${messages.invalidPermissionsResponse}`,
                flags: 64,
              });
            }
          }

          if (command.botPermissions && command.botPermissions.length > 0) {
            if (
              !interaction.guild?.members.me.permissions.has(
                command.botPermissions
              )
            ) {
              return await interaction.reply({
                content: `${messages.invalidBotPermissionsResponse}`,
                flags: 64,
              });
            }
          }

          await command.action(interaction);
          return;
        }

        const defaultKey =
          commandType === "user"
            ? "invalidUserContextMenuResponse"
            : commandType === "message"
            ? "invalidMessageContextMenuResponse"
            : "defaultSlashCommandResponse";

        return await interaction.autoReply(defaultKey);
      }

      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////

      // Przyciski

      if (interaction.isButton()) {
        const customId = interaction.customId;
        const [commandName, ...rest] = customId.split("-");

        const command = client.commands.slash.get(commandName);

        if (command && typeof command.interaction === "function") {
          const handled = await command.interaction(customId, interaction);
          if (handled) return; // jeśli obsłużone, kończ
        }

        return await interaction.autoReply("invalidButtonResponse");
      }

      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////

      // Select menu

      if (
        interaction.isStringSelectMenu() ||
        interaction.isUserSelectMenu() ||
        interaction.isRoleSelectMenu() ||
        interaction.isMentionableSelectMenu() ||
        interaction.isChannelSelectMenu()
      ) {
        const customId = interaction.customId;
        // Rozbijamy customId na [commandName, ...rest], tak samo jak dla przycisku
        const [commandName, ...rest] = customId.split("-");

        // Pobieramy komendę po nazwie
        const command = client.commands.slash.get(commandName);

        if (command && typeof command.interaction === "function") {
          const handled = await command.interaction(customId, interaction);
          if (handled) return;
        }

        const key =
          {
            3: messages.invalidStringSelectMenuResponse,
            5: messages.invalidUserSelectMenuResponse,
            6: messages.invalidRoleSelectMenuResponse,
            7: messages.invalidMentionableSelectMenuResponse,
            8: messages.invalidChannelSelectMenuResponse,
          }[interaction.componentType] || messages.invalidInteractionResponse;

        return await interaction.autoReply(key);
      }

      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////

      // Modal
      if (interaction.isModalSubmit()) {
        return await interaction.autoReply("invalidModalSubmitResponse");
      }

      // Autocomplete
      if (interaction.isAutocomplete()) {
        return await interaction.autoReply("invalidAutocompleteResponse");
      }

      // Wszystko inne
      await interaction.autoReply("invalidInteractionResponse");
    } catch (error) {
      console.error("Błąd w interactionCreate handler:", error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: messages.defaultSlashCommandResponse,
          flags: 64,
        });
      }
    }
  });
};

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
