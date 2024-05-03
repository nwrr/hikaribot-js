const { readdirSync } = require("fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { Player } = require("discord-player");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent],
  disableMentions: "everyone",
});

const player = new Player(client);
player.extractors.loadDefault();

client.commands = new Collection();
var CommandsArray = [];

readdirSync("./commands/").forEach((dirs) => {
  const commands = readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith(".js"));

  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    if (command.name && command.description) {
      CommandsArray.push(command);
      client.commands.set(command.name.toLowerCase(), command);
      delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    } else console.log(`[failed Command]  ${command.name.toLowerCase()}`);
  }
});

readdirSync("./events/").forEach((dirs) => {
  const discordEventFiles = readdirSync(`./events/${dirs}`).filter((file) => file.endsWith(".js"));

  for (const file of discordEventFiles) {
    const event = require(`./events/${dirs}/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else if (event.isPlayer) {
      player.events.on(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    delete require.cache[require.resolve(`./events/${dirs}/${file}`)];
  }
});

client.login(token);
