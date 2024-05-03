const { useMainPlayer } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "play",
  description: "command untuk memutar lagu",
  voiceChannel: true,
  options: [
    {
      name: "query",
      description: "judul / link",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async execute(interaction) {
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply("You're not in the voice channel");
    const query = interaction.options.getString("query", true);
    await interaction.deferReply({ ephemeral: true });

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: { metadata: interaction.channel },
      });
      await interaction.followUp(`${track.title} ditambahkan di queue`);
    } catch (e) {
      await interaction.followUp({ content: `Something went wrong, ${e}`, ephemeral: true });
    }
  },
};
