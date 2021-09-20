import { GuildMember, PartialGuildMember } from "discord.js";

import { colourRoles } from "../config/roles";

/**
 * Attaches to the memberUpdate event, and checks if the member is no longer boosting
 * the server (based on the premiumSubscriberRole). If true, then removes any of the configured
 * booster-only roles.
 *
 * @param {GuildMember | PartialGuildMember} old The state of the member before the update.
 * @param {GuildMember} newMember The state of the member after the update.
 */
export const manageRoles = async (
  old: GuildMember | PartialGuildMember,
  newMember: GuildMember
): Promise<void> => {
  if (
    old.roles.premiumSubscriberRole &&
    !newMember.roles.premiumSubscriberRole
  ) {
    console.log(`Saw ${old.user?.username} has stopped boosting!`);
    for (const roleId of colourRoles) {
      const target = newMember.roles.cache.find((role) => role.id === roleId);
      if (target) {
        await newMember.roles.remove(target);
        console.log(`Removed ${target.name} from them.`);
      }
    }
  }
};