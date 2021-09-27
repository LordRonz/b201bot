import { Message } from 'discord.js';
import { CustomClient, Command } from '../client';

const b201: Command = {
  run: async (_client: CustomClient, message: Message): Promise<void> => {
    message.channel.send('Adalah lab terbaik!');
  },
};

export default b201;
