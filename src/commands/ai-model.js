const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
} = require("discord.js");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const SERVER_URL = process.env.SERVER_URL;
const MODEL = process.env.MODEL;

let globalTime = 0;

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("ai-model-call")
    .setDescription(
      "Query Herro's Local AI (Has a default limit of once per 4 minutes)"
    )
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The Prompt to give the AI")
        .setRequired(true)
    ),
  run: async ({ interaction, client, handler }) => {
    if (Date.now() - globalTime < 4 * 60 * 1000) {
      interaction.reply("Please wait to use this command again!");
      return;
    }
    globalTime = Date.now();
    await interaction.deferReply();
    async function getAPIData(prompt) {
      try {
        const response = await fetch(`${SERVER_URL}/api/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              {
                role: "user",
                content: `${prompt}, keep this under 500 words maximum.`,
              },
            ],
            temperature: 0.4,
            max_tokens: 1000,
          }),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("Error:", error);
        interaction.editReply({
          content: `Error: ${error}`,
          flags: MessageFlags.Ephemeral,
        });
        return null;
      }
    }
    const prompt = interaction.options.getString("prompt");
    getAPIData(prompt).then((response) => {
      if (response) {
        interaction.editReply({
          content: response,
          flags: MessageFlags.Ephemeral,
        });
      }
    });
  },
  options: {
    //userPermission: ['Administrator'],
    //botPermission: ['Administrator'],
  },
};
