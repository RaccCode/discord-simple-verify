import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in successfully as ${readyClient.user?.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
