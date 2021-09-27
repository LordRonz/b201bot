import { Client, Collection, Message } from 'discord.js';
import * as config from './config/config';

interface CustomClient extends Client {
  commands: Collection<string, Command>;
  config: config.Config;
}

class CustomClient extends Client {
  public commands: Collection<string, Command> = new Collection();

  public config: config.Config = config;
}

interface Command {
  run: (client: CustomClient, msg: Message, args: string[]) => Promise<void>;
  aliases?: string[];
}

export { CustomClient, Command };
