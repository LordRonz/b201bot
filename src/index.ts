import { CustomClient } from './client';
import { token, intents, activities, partials } from './config/config';
import logger from './config/logger';
import * as events from './events';
import * as commands from './commands';

const client: CustomClient = new CustomClient({ intents, partials });

Object.entries(events).forEach((event) => {
  client.on(event[0], event[1].bind(null, client));
});

Object.entries(commands).forEach((command) => {
  client.commands.set(command[0], command[1]);

  command[1].aliases?.forEach((alias) => {
    client.commands.set(alias, command[1]);
  });
});

client.once('ready', () => {
  logger.info('Hello, World!');
  client?.user?.setActivity('Hello, World!');
  setInterval(() => {
    const newActivity = activities[Math.floor(Math.random() * activities.length)];
    client?.user?.setActivity(newActivity);
  }, 1000 * 60 * 15);
});

client.login(token);
