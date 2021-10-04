import { Intents, PartialTypes } from 'discord.js';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../../.env') });

export const token: string = process.env.TOKEN || 'abcd';
export const guildId: string = process.env.GUILDID || 'abcd';
export const clientId: string = process.env.CLIENTID || 'abcd';
export const intents: number[] = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
];
export const partials: PartialTypes[] = ['MESSAGE', 'CHANNEL', 'REACTION'];
export const prefix = '-';
export const activities = [
  `with the ${prefix}help command.`,
  'with the developers console.',
  'with some code.',
  'with JavaScript.',
  'with Python',
];

export const author = {
  name: 'B201Lab',
  icon_url:
    'https://lh3.googleusercontent.com/proxy/rzGmZBrM8c9nSWUOGdF5fjf9v3AGJrHZMf1v06n0GpcyUNFSdgzHdjZe--eW3jz0RmbIq9HVE2eeF3zU7eXLn6apGmXKn4Oe',
  url: 'http://b201.telematics.its.ac.id/',
};

export const footer = {
  text: 'B201 Labs',
  icon_url:
    'https://lh3.googleusercontent.com/proxy/56ZtgToeHkXeLekVWjVXjncBFYcf1y3J3qWG1OURKCEJ81SUsxQXdIvFzoleo2Tz75H6P-D90HH6RFFphkB4dwvVWRqclYoa',
};

export interface Config {
  token: string;
  guildId: string;
  clientId: string;
  intents: number[];
  prefix: string;
}
