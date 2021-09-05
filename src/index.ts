import { Client } from "discord.js";

import { manageRoles } from "./modules/manageRoles";

(async () => {
  const bot = new Client({ intents: ["GUILDS", "GUILD_MEMBERS"] });

  bot.on("ready", () => console.log("It lives!"));

  bot.on(
    "guildMemberUpdate",
    async (oldMember, newMember) => await manageRoles(oldMember, newMember)
  );

  await bot.login(process.env.DISCORD_TOKEN);
})();
