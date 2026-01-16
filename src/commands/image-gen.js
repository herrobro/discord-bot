const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
  MessageFlags,
  SelectMenuOptionBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
require("dotenv").config();

const imageUrl = process.env.IMAGE_URL;

const declarePrompt = (posPrompt, negPrompt) => {
  const payload = {
    alwayson_scripts: {
      ADetailer: {
        args: [
          true,
          false,
          {
            ad_cfg_scale: 7,
            ad_checkpoint: "Use same checkpoint",
            ad_clip_skip: 1,
            ad_confidence: 0.3,
            ad_controlnet_guidance_end: 1,
            ad_controlnet_guidance_start: 0,
            ad_controlnet_model: "None",
            ad_controlnet_module: "None",
            ad_controlnet_weight: 1,
            ad_denoising_strength: 0.4,
            ad_dilate_erode: 4,
            ad_inpaint_height: 512,
            ad_inpaint_only_masked: true,
            ad_inpaint_only_masked_padding: 32,
            ad_inpaint_width: 512,
            ad_mask_blur: 4,
            ad_mask_filter_method: "Area",
            ad_mask_k: 0,
            ad_mask_max_ratio: 1,
            ad_mask_merge_invert: "None",
            ad_mask_min_ratio: 0,
            ad_model: "Eyes.pt",
            ad_model_classes: "",
            ad_negative_prompt: "",
            ad_noise_multiplier: 1,
            ad_prompt: "detailed eyes",
            ad_restore_face: false,
            ad_sampler: "DPM++ 2M",
            ad_scheduler: "Use same scheduler",
            ad_steps: 28,
            ad_tab_enable: true,
            ad_use_cfg_scale: false,
            ad_use_checkpoint: false,
            ad_use_clip_skip: false,
            ad_use_inpaint_width_height: false,
            ad_use_noise_multiplier: false,
            ad_use_sampler: false,
            ad_use_steps: false,
            ad_use_vae: false,
            ad_vae: "Use same VAE",
            ad_x_offset: 0,
            ad_y_offset: 0,
            is_api: [],
          },
          {
            ad_cfg_scale: 7,
            ad_checkpoint: "Use same checkpoint",
            ad_clip_skip: 1,
            ad_confidence: 0.3,
            ad_controlnet_guidance_end: 1,
            ad_controlnet_guidance_start: 0,
            ad_controlnet_model: "None",
            ad_controlnet_module: "None",
            ad_controlnet_weight: 1,
            ad_denoising_strength: 0.4,
            ad_dilate_erode: 4,
            ad_inpaint_height: 512,
            ad_inpaint_only_masked: true,
            ad_inpaint_only_masked_padding: 32,
            ad_inpaint_width: 512,
            ad_mask_blur: 4,
            ad_mask_filter_method: "Area",
            ad_mask_k: 0,
            ad_mask_max_ratio: 1,
            ad_mask_merge_invert: "None",
            ad_mask_min_ratio: 0,
            ad_model: "hand_yolov8n.pt",
            ad_model_classes: "",
            ad_negative_prompt: "extra digits",
            ad_noise_multiplier: 1,
            ad_prompt: "detailed hand, natural hand, perfect hand",
            ad_restore_face: false,
            ad_sampler: "DPM++ 2M",
            ad_scheduler: "Use same scheduler",
            ad_steps: 28,
            ad_tab_enable: true,
            ad_use_cfg_scale: false,
            ad_use_checkpoint: false,
            ad_use_clip_skip: false,
            ad_use_inpaint_width_height: false,
            ad_use_noise_multiplier: false,
            ad_use_sampler: false,
            ad_use_steps: false,
            ad_use_vae: false,
            ad_vae: "Use same VAE",
            ad_x_offset: 0,
            ad_y_offset: 0,
            is_api: [],
          },
          {
            ad_cfg_scale: 7,
            ad_checkpoint: "Use same checkpoint",
            ad_clip_skip: 1,
            ad_confidence: 0.3,
            ad_controlnet_guidance_end: 1,
            ad_controlnet_guidance_start: 0,
            ad_controlnet_model: "None",
            ad_controlnet_module: "None",
            ad_controlnet_weight: 1,
            ad_denoising_strength: 0.4,
            ad_dilate_erode: 4,
            ad_inpaint_height: 512,
            ad_inpaint_only_masked: true,
            ad_inpaint_only_masked_padding: 32,
            ad_inpaint_width: 512,
            ad_mask_blur: 4,
            ad_mask_filter_method: "Area",
            ad_mask_k: 0,
            ad_mask_max_ratio: 1,
            ad_mask_merge_invert: "None",
            ad_mask_min_ratio: 0,
            ad_model: "None",
            ad_model_classes: "",
            ad_negative_prompt: "",
            ad_noise_multiplier: 1,
            ad_prompt: "",
            ad_restore_face: false,
            ad_sampler: "DPM++ 2M",
            ad_scheduler: "Use same scheduler",
            ad_steps: 28,
            ad_tab_enable: true,
            ad_use_cfg_scale: false,
            ad_use_checkpoint: false,
            ad_use_clip_skip: false,
            ad_use_inpaint_width_height: false,
            ad_use_noise_multiplier: false,
            ad_use_sampler: false,
            ad_use_steps: false,
            ad_use_vae: false,
            ad_vae: "Use same VAE",
            ad_x_offset: 0,
            ad_y_offset: 0,
            is_api: [],
          },
          {
            ad_cfg_scale: 7,
            ad_checkpoint: "Use same checkpoint",
            ad_clip_skip: 1,
            ad_confidence: 0.3,
            ad_controlnet_guidance_end: 1,
            ad_controlnet_guidance_start: 0,
            ad_controlnet_model: "None",
            ad_controlnet_module: "None",
            ad_controlnet_weight: 1,
            ad_denoising_strength: 0.4,
            ad_dilate_erode: 4,
            ad_inpaint_height: 512,
            ad_inpaint_only_masked: true,
            ad_inpaint_only_masked_padding: 32,
            ad_inpaint_width: 512,
            ad_mask_blur: 4,
            ad_mask_filter_method: "Area",
            ad_mask_k: 0,
            ad_mask_max_ratio: 1,
            ad_mask_merge_invert: "None",
            ad_mask_min_ratio: 0,
            ad_model: "None",
            ad_model_classes: "",
            ad_negative_prompt: "",
            ad_noise_multiplier: 1,
            ad_prompt: "",
            ad_restore_face: false,
            ad_sampler: "DPM++ 2M",
            ad_scheduler: "Use same scheduler",
            ad_steps: 28,
            ad_tab_enable: true,
            ad_use_cfg_scale: false,
            ad_use_checkpoint: false,
            ad_use_clip_skip: false,
            ad_use_inpaint_width_height: false,
            ad_use_noise_multiplier: false,
            ad_use_sampler: false,
            ad_use_steps: false,
            ad_use_vae: false,
            ad_vae: "Use same VAE",
            ad_x_offset: 0,
            ad_y_offset: 0,
            is_api: [],
          },
        ],
      },
      "API payload": {
        args: [],
      },
      Comments: {
        args: [],
      },
      "Dynamic Prompts v2.17.1": {
        args: [
          true,
          false,
          1,
          false,
          false,
          false,
          1.1,
          1.5,
          100,
          0.7,
          false,
          false,
          true,
          false,
          false,
          0,
          "Gustavosta/MagicPrompt-Stable-Diffusion",
          "",
        ],
      },
      "Extra options": {
        args: [],
      },
      Hypertile: {
        args: [],
      },
      Refiner: {
        args: [false, "", 0.8],
      },
      Sampler: {
        args: [27, "DPM++ 2M", "Automatic"],
      },
      Seed: {
        args: [-1, false, -1, 0, 0, 0],
      },
      "Simple wildcards": {
        args: [],
      },
    },
    batch_size: 1,
    cfg_scale: 7,
    comments: {},
    denoising_strength: 0.65,
    disable_extra_networks: false,
    do_not_save_grid: false,
    do_not_save_samples: false,
    enable_hr: true,
    height: 1280,
    hr_negative_prompt: `score_4, source_pony, (worst quality:1.2), (low quality:1.2), (normal quality:1.2), lowres, bad anatomy, bad hands, signature, watermarks, ugly, imperfect eyes, skewed eyes, unnatural face, unnatural body, error, extra limb, missing limbs, painting by bad-artist, long neck, muscular female, ? , simple background, hands in frame, hand, hat, crowd, light, wet body, wet skin, ${negPrompt}`,
    hr_prompt: `score_9, score_8_up, score_7_up, score_6_up, score_5_up, masterpiece, best quality, amazing quality, very aesthetic, absurdres, newest, detailed background, ${posPrompt}`,
    hr_resize_x: 0,
    hr_resize_y: 0,
    hr_scale: 1.5,
    hr_scheduler: "Automatic",
    hr_second_pass_steps: 15,
    hr_upscaler: "Latent",
    n_iter: 1,
    negative_prompt: `score_4, source_pony, (worst quality:1.2), (low quality:1.2), (normal quality:1.2), lowres, bad anatomy, bad hands, signature, watermarks, ugly, imperfect eyes, skewed eyes, unnatural face, unnatural body, error, extra limb, missing limbs, painting by bad-artist, long neck, muscular female, ? , simple background, hands in frame, hand, hat, crowd, light, wet body, wet skin, ${negPrompt}`,
    override_settings: {},
    override_settings_restore_afterwards: true,
    prompt: `score_9, score_8_up, score_7_up, score_6_up, score_5_up, masterpiece, best quality, amazing quality, very aesthetic, absurdres, newest, detailed background, ${posPrompt}`,
    restore_faces: false,
    s_churn: 0,
    s_min_uncond: 0,
    s_noise: 1,
    s_tmax: null,
    s_tmin: 0,
    sampler_name: "DPM++ 2M",
    scheduler: "Automatic",
    script_args: [],
    script_name: null,
    seed: -1,
    seed_enable_extras: true,
    seed_resize_from_h: -1,
    seed_resize_from_w: -1,
    steps: 27,
    styles: [],
    subseed: -1,
    subseed_strength: 0,
    tiling: false,
    width: 720,
  };

  return payload;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate-image")
    .setDescription("Generate an Image from Stable Diffusion!")
    .addStringOption((option) =>
      option
        .setName("positiveprompt")
        .setDescription("The positive prompt to use for the image.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("negativeprompt")
        .setDescription("The negative prompt to use for the image (optional)")
        .setRequired(false)
    ),
  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply();
    const positive = interaction.options.getString("positiveprompt");
    let negative = interaction.options.getString("negativeprompt");
    if (!negative) {
      negative = "";
    }
    async function imageGen(body) {
      const result = await fetch(`${imageUrl}/sdapi/v1/txt2img`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      return response.images[0];
      /*result.images.forEach((img, i) => {
        const buf = Buffer.from(img, 'base64');
        fs.writeFile("./images/"+Date.now()+'.png', buf).then(() => {
            console.log('Image saved');
        }).catch((err) => {
            console.log(err);
        })
    })
    */
    }
    const payload = declarePrompt(positive, negative);
    imageGen(payload).then((response) => {
      try {
        const buf = Buffer.from(response, "base64");
        let date = Date.now();
        const file = new AttachmentBuilder(buf, { name: date + ".png" });
        const embed = new EmbedBuilder()
          .setTitle("GENERATED IMAGE")
          .setColor(0x00ae86)
          .setImage(`attachment://${date}.png`)
          .setFooter({ text: "Provided by Stable Diffusion" });

        return interaction.editReply({ embeds: [embed], files: [file] });
      } catch (error) {
        console.log(error);
      }
    });
  },
};
