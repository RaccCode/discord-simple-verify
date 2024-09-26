import { Client, Events, GatewayIntentBits, GuildMember } from "discord.js";
import "dotenv/config";
import { buttonCommand, sendButton } from "./commands/send-button";

// Initial checks to ensure that the required environment variables are provided
if (!process.env.DISCORD_TOKEN) {
  throw new Error(
    "No Discord bot token provided. Provide it in the .env file with the key DISCORD_TOKEN"
  );
}

if (!process.env.GUILD_ID) {
  throw new Error(
    "No guild ID provided. Provide it in the .env file with the key GUILD_ID"
  );
}

if (!process.env.ROLE_ID) {
  throw new Error(
    "No verified role ID provided. Provide it in the .env file with the key ROLE_ID"
  );
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in successfully as ${readyClient.user?.tag}!`);
});

// Register send button command
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === buttonCommand.name) {
    await sendButton(interaction);
  }
});

// Register button handler
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify") {
    const member = interaction.member;
    if (!member) return;
    if (!(member instanceof GuildMember)) return;

    const role = interaction.guild?.roles.cache.get(process.env.ROLE_ID!);
    if (!role) return;

    member.roles.add(role);

    await interaction.reply({
      content: "You have been verified!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
