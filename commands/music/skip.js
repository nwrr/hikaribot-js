const { useQueue } = require("discord-player");

module.exports = {
  name: "skip",
  description: "skip lagu yg sedang diputar",
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.skip();
    await interaction.reply("Lagu di skip");
  },
};
