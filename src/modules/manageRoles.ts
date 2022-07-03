import { GuildMember } from "discord.js";

import { boosterRole, colourRoles } from "../config/roles";
import { errorHandler } from "../utils/errorHandler";

/**
 * Attaches to the memberUpdate event, and checks if the member is no longer boosting
 * the server (based on the premiumSubscriberRole). If true, then removes any of the configured
 * booster-only roles.
 *
 * @param {GuildMember} newMember The state of the member after the update.
 */
export const manageRoles = async (newMember: GuildMember): Promise<void> => {
  try {
    if (!newMember.roles.cache.has(boosterRole)) {
      for (const roleId of colourRoles) {
        const target = newMember.roles.cache.find((role) => role.id === roleId);
        if (target) {
          await newMember.roles.remove(target);
          console.log(`Removed ${target.name} from ${newMember.user.tag}`);
        }
      }
    }
  } catch (err) {
    await errorHandler("manageRoles", err);
  }
};
