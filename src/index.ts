import { RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import { Client, WebhookClient } from "discord.js";

import { manageRoles } from "./modules/manageRoles";
import { errorHandler } from "./utils/errorHandler";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

(async () => {
  try {
    const bot = new Client({ intents: ["GUILDS", "GUILD_MEMBERS"] });

    bot.on("ready", async () => {
      const hook = new WebhookClient({ url: process.env.DEBUG_HOOK as string });
      await hook.send("Oogie boogie boostie woostie online!");

      const guild = bot.guilds.cache.map((el) => el)[0];
      const members = await guild.members.fetch();
      await hook.send(`Loaded ${members.size} members from ${guild.name}`);
    });

    bot.on("guildMemberUpdate", async (_oldMember, newMember) => {
      await manageRoles(newMember);
    });

    await bot.login(process.env.DISCORD_TOKEN);
  } catch (err) {
    await errorHandler("index", err);
  }
})();
