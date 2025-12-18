const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
  EmbedBuilder,
} = require("discord.js");

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const imageGen = async () => {
  try {
    const response = await fetch(
      "https://n8n.homelabmanager.com/webhook/82b3ab7b-4d93-4d30-a66a-c8be8e95f6dc",
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
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
      console.log(isObject(response));
      let success = !isObject(response)
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
