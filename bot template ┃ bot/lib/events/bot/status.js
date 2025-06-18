const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,

  execute(client) {
    const activities = [
      { name: "status 1", type: ActivityType.Custom },
      { name: "status 2", type: ActivityType.Custom },
      { name: "status 3", type: ActivityType.Custom },
    ];

    let index = 0;

    function setActivity() {
      const activity = activities[index];
      client.user.setPresence({
        activities: [activity],
        status: "online",
        afk: false,
      });

      index++;
      if (index >= activities.length) index = 0;
    }

    setActivity();

    setInterval(setActivity, 5000);
  },
};
