const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
  EmbedBuilder,
} = require("discord.js");

const gpuOutput = async () => {
  try {
    const response = await fetch(
      "https://n8n.homelabmanager.com/webhook-test/1e30d368-26d9-411d-8af5-2d13b87a5c59"
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

const formatOutput = () => {
  gpuOutput().then((response) => {
    const out = response[0].stdout;
    const outputCodeBlock = `\`\`\`\n${stdout}\n\`\`\``;
    return outputCodeBlock;
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkgpu")
    .setDescription("Check the GPU stats in Discord!"),
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply();
    gpuOutput().then((response) => {
      try {
        const out = response[0].stdout;
        const outputCodeBlock = `\`\`\`\n${out}\n\`\`\``;
        let value2 = !outputCodeBlock ? "Undefined Input" : outputCodeBlock;
        const embed = new EmbedBuilder()
          .setTitle("NVIDIA SMI")
          .setDescription(value2)
          .setColor(0x00ae86)
          .setFooter({ text: "Information from n8n" });

        return interaction.editReply({ embeds: [embed] });
      } catch (error) {
        console.log(error);
      }
    });
  },
};
