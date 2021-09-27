import { Intents } from 'discord.js';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../../.env') });

const token: string = process.env.TOKEN || 'ODkxMjM3NjQyNDkzMTMyODIw.YU7bvA.4iqR6ojalj3Nd4qX2yKkWAGmjKM';
const guildId: string = process.env.GUILDID || '891260440796094474';
const clientId: string = process.env.CLIENTID || '891237642493132820';
const intents: number[] = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
];
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

export { token, guildId, clientId, intents, prefix, activities, Config };
