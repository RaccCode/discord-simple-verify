import { REST, Routes } from "discord.js";
import "dotenv/config";
import { buttonCommand } from "./commands/send-button";

if (!process.env.DISCORD_TOKEN) {
  throw new Error(
    "No Discord bot token provided. Provide it in the .env file with the key DISCORD_TOKEN"
  );
}

if (!process.env.CLIENT_ID) {
  throw new Error(
    "No client ID provided. Provide it in the .env file with the key CLIENT_ID"
  );
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering application command.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: [buttonCommand.toJSON()],
    });

    console.log("Successfully reloaded application command.");
  } catch (error) {
    console.error(error);
  }
})();
