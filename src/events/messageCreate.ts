import { Message } from 'discord.js';
import { CustomClient } from '../client';
import logger from '../config/logger';

const messageCreate = (client: CustomClient, msg: Message): void => {
  // Ignore all bots
  if (msg.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (msg.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);

  const command = args?.shift()?.toLowerCase();

  if (!command) return;

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, msg, args).catch((e) => {
    logger.error(e);
  });
};

export default messageCreate;
