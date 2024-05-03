module.exports = {
  name: "ping",
  description: "Cek respons otak",
  execute(interaction) {
    interaction.reply({ content: `Pong! ${interaction.client.ws.ping}ms`, ephemeral: true });
  },
};
