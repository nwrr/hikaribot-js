const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  name: "playerStart",
  isPlayer: true,
  execute(queue, track) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: "Sedang Diputar" })
      .setTitle(`${track.title} - ${track.author}`)
      .setDescription(track.duration)
      .setThumbnail(track.thumbnail)
      //.setFooter({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();
    queue.metadata.send({ embeds: [embed] });
  },
};
