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
      "https://n8n.homelabmanager.com/webhook/1e30d368-26d9-411d-8af5-2d13b87a5c59"
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

function parseNvidiaSmi(stdout) {
  const result = {
    temperature: null,
    powerUsage: null,
    gpuName: null,
    processes: [],
  };

  // Split into lines for easier parsing
  const lines = stdout.split("\n");

  // Find GPU info section
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Parse GPU name (line starting with "| 0" or other GPU ID)
    if (
      (/^\|\s+\d+\s+/.test(line) && line.includes("On")) ||
      line.includes("Off")
    ) {
      const nameMatch = line.match(
        /^\|\s+\d+\s+([^\s]+(?:\s+[^\s]+)*?)\s+(?:On|Off)/
      );
      if (nameMatch) {
        result.gpuName = nameMatch[1].trim();
      }

      // Check next line for temperature and power
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];

        // Parse temperature (format: "35C")
        const tempMatch = nextLine.match(/(\d+)C/);
        if (tempMatch) {
          result.temperature = parseInt(tempMatch[1]);
        }

        // Parse power usage (format: "10W / 140W")
        const powerMatch = nextLine.match(/(\d+)W\s*\/\s*(\d+)W/);
        if (powerMatch) {
          result.powerUsage = {
            current: parseInt(powerMatch[1]),
            max: parseInt(powerMatch[2]),
          };
        }
      }
    }

    // Parse processes section
    if (
      line.includes("| GPU") &&
      line.includes("PID") &&
      line.includes("Process name")
    ) {
      // Start parsing processes from next line after the separator
      for (let j = i + 2; j < lines.length; j++) {
        const procLine = lines[j];

        // Stop if we hit the bottom border or "No running processes"
        if (
          procLine.includes("+---") ||
          procLine.includes("No running processes")
        ) {
          break;
        }

        // Parse process line (format: "| 0 N/A N/A 12345 C python 1234MiB |")
        const procMatch = procLine.match(
          /^\|\s+(\d+)\s+\S+\s+\S+\s+(\d+)\s+(\S+)\s+(.+?)\s+(\d+)MiB/
        );
        if (procMatch) {
          result.processes.push({
            gpuId: parseInt(procMatch[1]),
            pid: parseInt(procMatch[2]),
            type: procMatch[3],
            name: procMatch[4].trim(),
            memoryUsage: parseInt(procMatch[5]),
          });
        }
      }
      break;
    }
  }

  return result;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkgpu")
    .setDescription("Check the GPU stats in Discord!"),
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply();
    gpuOutput().then((response) => {
      try {
        const out = response[0].stdout;
        const parsed = parseNvidiaSmi(out);
        let value2 = !parsed ? "Undefined Input" : parsed;
        let formatted = `\`\`\`\nGPU Name: ${value2.gpuName}\nGPU Power: ${value2.powerUsage.current}W / ${value2.powerUsage.max}\nGPU Temperature: ${value2.temperature}\nGPU Processes: ${value2.processes}\`\`\``;
        const embed = new EmbedBuilder()
          .setTitle("NVIDIA SMI")
          .setDescription(formatted)
          .setColor(0x00ae86)
          .setFooter({ text: "Information from n8n" });

        return interaction.editReply({ embeds: [embed] });
      } catch (error) {
        console.log(error);
      }
    });
  },
};
