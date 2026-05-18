const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const stopUrl = process.env.STOP_URL;

function isSuccess(value) {
  if (value === 200) {
    return true;
  } else return false;
}

const imageGen = async () => {
  try {
    const response = await fetch(`${stopUrl}`, { method: "GET" });
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
    .setName("stop-image")
    .setDescription("Stop remote image generation."),
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply();
    imageGen().then((response) => {
      let success = isSuccess(response)
        ? "Image Generation Page Stopped!"
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
