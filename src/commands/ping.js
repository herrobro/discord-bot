const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  run: ({ interaction, client, handler }) => {
    interaction.reply("pong!");
  },
  options: {},
};
