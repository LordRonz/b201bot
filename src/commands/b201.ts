import { Message } from 'discord.js';
import { CustomClient, Command } from '../client';

const b201: Command = {
  run: (_client: CustomClient, message: Message): void => {
    message.channel.send('Adalah lab terbaik!');
  },
};

export default b201;
