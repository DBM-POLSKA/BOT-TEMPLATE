const { readdirSync } = require("fs");
const path = require("path");
const settings = require("../../config/settings.json");

function getEventFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      files = files.concat(getEventFiles(full));
    } else if (ent.isFile() && ent.name.endsWith(".js")) {
      files.push(full);
    }
  }
  return files;
}

module.exports = (client) => {
  const eventsPath = path.join(__dirname, `../../${settings.eventsFolder}`);
  const eventFiles = getEventFiles(eventsPath);

  for (const filePath of eventFiles) {
    const event = require(filePath);
    if (!event.name || typeof event.execute !== "function") continue;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }
};
