import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
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

const getEmbed = () => {
  return new EmbedBuilder()
    .setTitle("Verification")
    .setColor("#ad1457")
    .setDescription(
      "If you agree with the rules, click the button below to verify yourself and gain access to the server."
    );
};

export const sendButton = async (interaction: ChatInputCommandInteraction) => {
  const buttonRow = await getButton();
  const channel = interaction.channel;
  if (!(channel instanceof TextChannel)) {
    return interaction.reply({
      content: "This command can only be run in a text channel.",
      ephemeral: true,
    });
  }

  await channel.send({
    embeds: [getEmbed()],
    components: [buttonRow],
  });

  interaction.reply({
    content: "Button sent!",
    ephemeral: true,
  });
};
