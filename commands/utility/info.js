const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "info",
  description: "tentang app ini",
  execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
      .setDescription("Ini adalah app yang dibuat pas gabut")
      .setFooter({ text: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();
    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
