const { readdirSync } = require("fs");
const {
  REST,
  Routes,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  SlashCommandBuilder,
} = require("discord.js");
const settings = require("../../config/settings.json");

module.exports = async (client) => {
  client.commands = {
    slash: new Map(),
    text: new Map(),
    user: new Map(),
    message: new Map(),
  };

  const rest = new REST({ version: "10" }).setToken(settings.token);

  const globalCommands = [];
  const guildMap = new Map();

  const addToGuild = (guildId, cmdData) => {
    if (!guildMap.has(guildId)) guildMap.set(guildId, []);
    guildMap.get(guildId).push(cmdData);
  };

  const getCommandFiles = (dir) => {
    const entries = readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        files = files.concat(getCommandFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        files.push(fullPath);
      }
    }
    return files;
  };

  const commandsPath = settings.commandsFolder;
  const commandFiles = getCommandFiles(__dirname + `/../../${commandsPath}`);

  for (const filePath of commandFiles) {
    const cmd = require(filePath);
    if (cmd.enabled === false) continue; // ← Pomiń wyłączone komendy

    if (!cmd.name || !cmd.type || typeof cmd.action !== "function") continue;

    const type = cmd.type.toLowerCase();
    const cmdGuilds = Array.isArray(cmd.guilds) ? cmd.guilds : [];
    const scope = Number.isInteger(cmd.slashCommandType)
      ? cmd.slashCommandType
      : 0;

    // Slash & Context Menus: Rejestracja do Discord API
    let commandData;
    if (type === "slash") {
      const builder = new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description || "No description");

      if (Array.isArray(cmd.options)) {
        for (const option of cmd.options) {
          builder.addStringOption((opt) =>
            opt
              .setName(option.name)
              .setDescription(option.description || "No description")
              .setRequired(!!option.required)
          );
          // Możesz tu rozbudować też o inne typy, np. user, integer, boolean, itd.
        }
      }

      commandData = builder.toJSON();

      client.commands.slash.set(cmd.name, cmd);
    } else if (type === "user-menu") {
      commandData = new ContextMenuCommandBuilder()
        .setName(cmd.name)
        .setType(ApplicationCommandType.User)
        .toJSON();

      client.commands.user.set(cmd.name, cmd);
    } else if (type === "msg-menu") {
      commandData = new ContextMenuCommandBuilder()
        .setName(cmd.name)
        .setType(ApplicationCommandType.Message)
        .toJSON();

      client.commands.message.set(cmd.name, cmd);
    }

    // Text commands nie rejestrujemy w Discord API
    if (type === "text") {
      client.commands.text.set(cmd.name, cmd);
      continue;
    }

    // slash / menu: rozkładanie do global/guild
    if (commandData) {
      switch (scope) {
        case 1:
          globalCommands.push(commandData);
          break;
        case 2:
          (Array.isArray(settings.guilds) ? settings.guilds : []).forEach(
            (gId) => addToGuild(gId, commandData)
          );
          break;
        case 3:
          cmdGuilds.forEach((gId) => addToGuild(gId, commandData));
          break;
        case 4:
          (Array.isArray(settings.guilds) ? settings.guilds : [])
            .filter((gId) => !cmdGuilds.includes(gId))
            .forEach((gId) => addToGuild(gId, commandData));
          break;
        case 0:
        default:
          if (client.guilds.cache.size > 50) {
            globalCommands.push(commandData);
          } else {
            (Array.isArray(settings.guilds) ? settings.guilds : []).forEach(
              (gId) => addToGuild(gId, commandData)
            );
          }
          break;
      }
    }

    // Uruchom botInit
    if (typeof cmd.botInit === "function") {
      try {
        await cmd.botInit(client);
      } catch (err) {
        console.error(`botInit error in ${cmd.name}:`, err);
      }
    }
  }

  // Rejestracja komend
  try {
    if (globalCommands.length) {
      await rest.put(Routes.applicationCommands(settings.clientId), {
        body: globalCommands,
      });
    }

    for (const [guildId, cmds] of guildMap) {
      await rest.put(
        Routes.applicationGuildCommands(settings.clientId, guildId),
        { body: cmds }
      );
    }
  } catch (err) {
    console.error("Failed to register application commands:", err);
  }
};
