import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CustomClient, Command } from '../client';

const author = {
  name: 'B201Lab',
  icon_url:
    'https://lh3.googleusercontent.com/proxy/rzGmZBrM8c9nSWUOGdF5fjf9v3AGJrHZMf1v06n0GpcyUNFSdgzHdjZe--eW3jz0RmbIq9HVE2eeF3zU7eXLn6apGmXKn4Oe',
  url: 'http://b201.telematics.its.ac.id/',
};

const materiEmbed = {
  color: 0xff0000,
  title: 'Materi',
  url: 'https://discord.js.org',
  author,
  description: 'Some description here',
  thumbnail: {
    url: 'https://i.imgur.com/AfFp7pu.png',
  },
  fields: [
    {
      name: 'Regular field title',
      value: 'Some value here',
    },
    {
      name: '\u200b',
      value: '\u200b',
      inline: false,
    },
    {
      name: 'Inline field title',
      value: 'Some value here',
      inline: true,
    },
    {
      name: 'Inline field title',
      value: 'Some value here',
      inline: true,
    },
    {
      name: 'Inline field title',
      value: 'Some value here',
      inline: true,
    },
  ],
  image: {
    url: 'https://i.imgur.com/AfFp7pu.png',
  },
  timestamp: new Date(),
  footer: {
    text: 'Some footer text here',
    icon_url: 'https://i.imgur.com/AfFp7pu.png',
  },
};

const p1Embed = {
  color: 0xff0000,
  title: 'Modul P1 Perkenalan',
  url: 'https://discord.js.org',
  author,
  description: readFileSync(join(__dirname, '/txts/p1Description.txt'), 'utf-8'),
  timestamp: new Date(),
};

const row = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('modulp1').setLabel('P1').setStyle('PRIMARY'),
  new MessageButton().setCustomId('modulp2').setLabel('P2').setStyle('PRIMARY')
);

const rowDisabled = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('modulp1').setLabel('P1').setStyle('PRIMARY').setDisabled(),
  new MessageButton().setCustomId('modulp2').setLabel('P2').setStyle('PRIMARY').setDisabled()
);

const materi: Command = {
  run: async (client: CustomClient, message: Message): Promise<void> => {
    const collector = message.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

    collector.on('collect', async (i) => {
      if (i.customId === 'modulp1') {
        i.reply({ embeds: [p1Embed] });
        collector.resetTimer();
      }
    });

    const msg = await message.channel.send({ embeds: [materiEmbed], components: [row] });

    collector.on('end', () => {
      msg.edit({ embeds: [materiEmbed], components: [rowDisabled] });
    });
  },
  aliases: ['modul'],
};

export default materi;
