# Command Types

- text
- slash
- user-menu
- msg-menu

# Slash Command Types

- 0 komenda automatyczna (>50 serwerów = komenda globalna), (<50 serwerów = komenda jak w 2)
- 1 komenda globalna
- 2 komenda dla wszystkich serwerów z settings.guilds
- 3 komenda dla wybranych serwerów cmd.guilds
- 4 komenda dla wszystkich serwerów z settings.guilds oprócz cmd.guilds

# Options Types (slash)

- 3 STRING
- 4 INTEGER
- 5 BOOLEAN
- 6 USER
- 7 CHANNEL
- 8 ROLE
- 9 MENTIONABLE
- 10 NUMBER

**example**

options: [
{
name: "echo",
description: "test",
type: 3,
required: true,
},
],

# Command Restrictions

- none
- server
- owner
- dm
- botOwners

# Functions

- await wait(5000);
- const options = getOptionsObject(interaction);

**example command**

module.exports = {
enabled: true, // should the command be registered
name: "test", // command name
description: "test", // command description
type: "slash", // command type (text / slash / user-menu / msg-menu)
permissions: [], // user required permissions
botPermissions: [], // bot required permissions
commandRestriction: "none", // where you can use the command (none / server / owner / dm / botOwners)

prefix: "?", // text command prefix
aliases: [], // text command aliases

slashCommandType: 0, // (0 = auto / 1 = global / 2 = for all servers / 3 = for selected servers / 4 = for all servers and ignore selected servers)
guilds: [],
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
