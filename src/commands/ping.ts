import { Message } from 'discord.js';
import { CustomClient, Command } from '../client';

const ping: Command = {
  run: async (_client: CustomClient, message: Message): Promise<void> => {
    message.channel.send('pong!');
  },
};

export default ping;
