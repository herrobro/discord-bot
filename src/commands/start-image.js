const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const startUrl = process.env.START_URL;

function isSuccess(value) {
  if (value === 200) {
    return true;
  } else return false;
}

const imageGen = async () => {
  try {
    const response = await fetch(`${startUrl}`, { method: "GET" });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    console.log(response);
    console.log(response.status);
    const resp = response.status;
    return await resp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("start-image")
    .setDescription("Start remote image generation."),
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply();
    imageGen().then((response) => {
      let success = isSuccess(response)
        ? "Image Generation Page Started!"
        : `${response}`;
      console.log(success);
      const embed = new EmbedBuilder()
        .setTitle("Image Generation")
        .setDescription(success)
        .setColor(0x00ae86)
        .setURL("https://diff.playwithherro.com")
        .setFooter({ text: "Triggered by n8n" });

      return interaction.editReply({ embeds: [embed] });
    });
  },
};
