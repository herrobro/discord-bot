const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
} = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testcommand")
    .setDescription("test command")
    .addStringOption((option) =>
      option.setName("test1").setDescription("test1").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("test2").setDescription("test2").setRequired(true)
    ),
  run: ({ interaction, client, handler }) => {
    interaction.reply(interaction.options.getString("test1"));
    interaction.reply(interaction.option.getString("test2"));
  },
  options: {},
};
