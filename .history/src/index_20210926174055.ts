import { CustomClient } from './client';
import { token, intents, activities } from './config/config';
import logger from './config/logger';
import * as events from './events';
import * as commands from './commands';

const client: CustomClient = new CustomClient({ intents });

Object.entries(events).forEach((event) => {
  client.on(event[0], event[1].bind(null, client));
  console.log(JSON.stringify(event))
});

Object.entries(commands).forEach((command) => {
  client.commands.set(command[0], command[1]);
  console.log(JSON.stringify(command))
});

client.once('ready', () => {
  logger.info('Hello, World!');
  client?.user?.setActivity('Hello, World!');
  setInterval(() => {
    const newActivity = activities[Math.floor(Math.random() * activities.length)];
    client?.user?.setActivity(newActivity);
  }, 1000 * 60 * 15);
});

client.on('message', msg=>{
  console.log("message")
  console.log(msg.content)
  
  message.channel.send("My Message");
})


client.login(token);
