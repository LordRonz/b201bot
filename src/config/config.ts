import { Intents, PartialTypes } from 'discord.js';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../../.env') });

const token: string = process.env.TOKEN || 'abcd';
const guildId: string = process.env.GUILDID || 'abcd';
const clientId: string = process.env.CLIENTID || 'abcd';
const intents: number[] = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
];
const partials: PartialTypes[] = ['MESSAGE', 'CHANNEL', 'REACTION'];
const prefix = '-';
const activities = [
  `with the ${prefix}help command.`,
  'with the developers console.',
  'with some code.',
  'with JavaScript.',
  'with Python',
];

interface Config {
  token: string;
  guildId: string;
  clientId: string;
  intents: number[];
  prefix: string;
}

export { token, guildId, clientId, intents, prefix, activities, partials, Config };
