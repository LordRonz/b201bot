import { Message } from 'discord.js';
import { CustomClient, Command } from '../client';

const ping: Command = {
  run: (_client: CustomClient, message: Message): void => {
    message.channel.send('pong!');
  },
};

export default ping;
