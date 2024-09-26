import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const buttonCommand = new SlashCommandBuilder()
  .setName("send-button")
  .setDescription(
    "Sends the verified button to the channel this command is run in"
  );

const getButton = async () => {
  const verifyButton = new ButtonBuilder()
    .setCustomId("verify")
    .setLabel("Verify")
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(verifyButton);
  return row;
};

export const sendButton = async (interaction: ChatInputCommandInteraction) => {
  const buttonRow = await getButton();
  await interaction.reply({
    content: "Click the button to verify yourself",
    components: [buttonRow],
  });
};
