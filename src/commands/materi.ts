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
  url: 'https://drive.google.com/file/d/1NXAidMXP8IcqpODPsoRI_QmHt35B0Q1c/view',
  author,
  timestamp: new Date(),
};

const p1Embeds = [
  { ...p1Embed, description: readFileSync(join(__dirname, '/txts/p1Description.txt'), 'utf-8') },
  { ...p1Embed, description: readFileSync(join(__dirname, '/txts/p1Description1.txt'), 'utf-8') },
  { ...p1Embed, description: readFileSync(join(__dirname, '/txts/p1Description2.txt'), 'utf-8') },
  { ...p1Embed, description: readFileSync(join(__dirname, '/txts/p1Description3.txt'), 'utf-8') },
  { ...p1Embed, description: readFileSync(join(__dirname, '/txts/p1Description4.txt'), 'utf-8') },
];

const mainRow = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('modulp1').setLabel('P1').setStyle('PRIMARY'),
  new MessageButton().setCustomId('modulp2').setLabel('P2').setStyle('PRIMARY')
);

const p1Row = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('p1first').setLabel('<<').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1prev').setLabel('<').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1next').setLabel('>').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1last').setLabel('>>').setStyle('PRIMARY')
);

const p1RowBackDisabled = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('p1first').setLabel('<<').setStyle('PRIMARY').setDisabled(),
  new MessageButton().setCustomId('p1prev').setLabel('<').setStyle('PRIMARY').setDisabled(),
  new MessageButton().setCustomId('p1next').setLabel('>').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1last').setLabel('>>').setStyle('PRIMARY')
);

const p1RowNextDisabled = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('p1first').setLabel('<<').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1prev').setLabel('<').setStyle('PRIMARY'),
  new MessageButton().setCustomId('p1next').setLabel('>').setStyle('PRIMARY').setDisabled(),
  new MessageButton().setCustomId('p1last').setLabel('>>').setStyle('PRIMARY').setDisabled()
);

const backRow = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('back').setLabel('Back').setStyle('SECONDARY')
);

const materi: Command = {
  run: async (client: CustomClient, message: Message): Promise<void> => {
    const collector = message.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 30000,
      interactionType: 'MESSAGE_COMPONENT',
      channel: message.channel,
    });

    let page = 0;
    const p1MaxPage = 4;

    collector.on('collect', (i) => {
      if (i.customId === 'modulp1') {
        page = 0;
        i.update({ embeds: [p1Embeds[page]], components: [p1RowBackDisabled, backRow] });
      } else if (i.customId === 'p1next') {
        page += 1;
        i.update({ embeds: [p1Embeds[page]], components: [page < p1MaxPage ? p1Row : p1RowNextDisabled, backRow] });
      } else if (i.customId === 'p1prev') {
        page -= 1;
        i.update({ embeds: [p1Embeds[page]], components: [page > 0 ? p1Row : p1RowBackDisabled, backRow] });
      } else if (i.customId === 'back') {
        i.update({ embeds: [materiEmbed], components: [mainRow] });
      } else {
        return;
      }
      collector.resetTimer();
    });

    let msg = await message.channel.send({ embeds: [materiEmbed], components: [mainRow] });

    collector.on('end', async () => {
      msg = await msg.fetch();
      msg.components.forEach((row) => {
        row.components.forEach((component) => {
          component.setDisabled();
        });
      });
      msg.edit({ embeds: msg.embeds, components: msg.components });
    });

    if (collector.checkEnd()) {
      collector.stop();
    }
  },
  aliases: ['modul'],
};

export default materi;
