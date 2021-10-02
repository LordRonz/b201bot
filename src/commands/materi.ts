import { Message, MessageActionRow, MessageButton, MessageEmbedOptions } from 'discord.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CustomClient, Command } from '../client';
import { author, footer } from '../config/config';

const materiEmbed = {
  color: 0xff0000,
  title: 'Materi Praktikum Algoritma Pemrograman',
  url: 'https://drive.google.com/drive/folders/1RnLLT9OvREvi2-y3NFoecHjEkWjrCmxr',
  author,
  description: 'Command ini akan menampilkan materi pada tiap modul yang ada di praktikum Alprog',
  thumbnail: {
    url: 'https://lh3.googleusercontent.com/proxy/56ZtgToeHkXeLekVWjVXjncBFYcf1y3J3qWG1OURKCEJ81SUsxQXdIvFzoleo2Tz75H6P-D90HH6RFFphkB4dwvVWRqclYoa',
  },
  fields: [
    {
      name: 'Modul P1',
      value: '[Perkenalan](https://drive.google.com/file/d/1NXAidMXP8IcqpODPsoRI_QmHt35B0Q1c/view)',
    },
    {
      name: 'Modul P2',
      value: '[Percabangan](https://drive.google.com/file/d/1THupkiO7NGP_AzVcn9jkQv393YgmIUHH/view)',
    },
    {
      name: 'Modul P3',
      value: '[Perulangan](https://drive.google.com/file/d/1xbPQmy-cZHVlfX6JFYun7pL0WturGIqx/view)',
    },
    {
      name: 'Modul P4',
      value: '[Array dan Fungsi](https://drive.google.com/file/d/10q-FsVY5N8YOAvccaiYGO7CTqbZimKKe/view)',
    },
  ],
  timestamp: new Date(),
  footer,
};

const p1Embed = {
  color: 0xff0000,
  title: 'Modul P1 Perkenalan',
  url: 'https://drive.google.com/file/d/1NXAidMXP8IcqpODPsoRI_QmHt35B0Q1c/view',
  author,
  footer,
};

const p2Embed = {
  ...p1Embed,
  title: 'Modul P2 Percabangan',
  url: 'https://drive.google.com/file/d/1THupkiO7NGP_AzVcn9jkQv393YgmIUHH/view',
};

const p3Embed = {
  ...p1Embed,
  title: 'Modul P3 Perulangan',
  url: 'https://drive.google.com/file/d/1xbPQmy-cZHVlfX6JFYun7pL0WturGIqx/view',
};

const p1Embeds = Array(5)
  .fill(0)
  .map((_e, i) => {
    return { ...p1Embed, description: readFileSync(join(__dirname, `/txts/p1Description${i}.txt`), 'utf-8') };
  });

const p2Embeds = Array(6)
  .fill(0)
  .map((_e, i) => {
    return { ...p2Embed, description: readFileSync(join(__dirname, `/txts/p2Description${i}.txt`), 'utf-8') };
  });

const p3Embeds = Array(6)
  .fill(0)
  .map((_e, i) => {
    return { ...p3Embed, description: readFileSync(join(__dirname, `/txts/p3Description${i}.txt`), 'utf-8') };
  });

const mainRow = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('modulp1').setLabel('P1').setStyle('PRIMARY'),
  new MessageButton().setCustomId('modulp2').setLabel('P2').setStyle('PRIMARY'),
  new MessageButton().setCustomId('modulp3').setLabel('P3').setStyle('PRIMARY')
);

const makeModulRow = (m: string, dis: [boolean, boolean, boolean, boolean] = [false, false, false, false]) => {
  return new MessageActionRow().addComponents(
    new MessageButton().setCustomId(`${m}first`).setLabel('<<').setStyle('PRIMARY').setDisabled(dis[0]),
    new MessageButton().setCustomId(`${m}prev`).setLabel('<').setStyle('PRIMARY').setDisabled(dis[1]),
    new MessageButton().setCustomId(`${m}next`).setLabel('>').setStyle('PRIMARY').setDisabled(dis[2]),
    new MessageButton().setCustomId(`${m}last`).setLabel('>>').setStyle('PRIMARY').setDisabled(dis[3])
  );
};

const p1Row = makeModulRow('p1');
const p2Row = makeModulRow('p2');
const p3Row = makeModulRow('p3');

const p1RowBackDisabled = makeModulRow('p1', [true, true, false, false]);
const p1RowNextDisabled = makeModulRow('p1', [false, false, true, true]);

const p2RowBackDisabled = makeModulRow('p2', [true, true, false, false]);
const p2RowNextDisabled = makeModulRow('p2', [false, false, true, true]);

const p3RowBackDisabled = makeModulRow('p3', [true, true, false, false]);
const p3RowNextDisabled = makeModulRow('p3', [false, false, true, true]);

const backRow = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('back').setLabel('Kembali').setStyle('SECONDARY'),
  new MessageButton().setCustomId('end').setLabel('Akhiri Interaksi').setStyle('SECONDARY')
);

const endRow = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('end').setLabel('Akhiri Interaksi').setStyle('SECONDARY')
);

const ts = (embed: MessageEmbedOptions) => {
  return { ...embed, timestamp: new Date() };
};

const materi: Command = {
  run: async (client: CustomClient, message: Message): Promise<void> => {
    const collector = message.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 30000,
      interactionType: 'MESSAGE_COMPONENT',
      channel: message.channel,
      filter: (m) => m.user === message.author,
    });

    let page = 0;
    const maxPage = {
      p1: p1Embeds.length - 1,
      p2: p2Embeds.length - 1,
      p3: p3Embeds.length - 1,
    };

    collector.on('collect', async (i) => {
      if (i.customId === 'modulp1') {
        page = 0;
        i.update({ embeds: [ts(p1Embeds[page])], components: [p1RowBackDisabled, backRow] });
      } else if (i.customId === 'p1next') {
        page += 1;
        i.update({ embeds: [ts(p1Embeds[page])], components: [page < maxPage.p1 ? p1Row : p1RowNextDisabled, backRow] });
      } else if (i.customId === 'p1prev') {
        page -= 1;
        i.update({ embeds: [ts(p1Embeds[page])], components: [page > 0 ? p1Row : p1RowBackDisabled, backRow] });
      } else if (i.customId === 'p1first') {
        page = 0;
        i.update({ embeds: [ts(p1Embeds[page])], components: [p1RowBackDisabled, backRow] });
      } else if (i.customId === 'p1last') {
        page = maxPage.p1;
        i.update({ embeds: [ts(p1Embeds[page])], components: [p1RowNextDisabled, backRow] });
      } else if (i.customId === 'modulp2') {
        page = 0;
        i.update({ embeds: [ts(p2Embeds[page])], components: [p2RowBackDisabled, backRow] });
      } else if (i.customId === 'p2next') {
        page += 1;
        i.update({ embeds: [ts(p2Embeds[page])], components: [page < maxPage.p2 ? p2Row : p2RowNextDisabled, backRow] });
      } else if (i.customId === 'p2prev') {
        page -= 1;
        i.update({ embeds: [ts(p2Embeds[page])], components: [page > 0 ? p2Row : p2RowBackDisabled, backRow] });
      } else if (i.customId === 'p2first') {
        page = 0;
        i.update({ embeds: [ts(p2Embeds[page])], components: [p2RowBackDisabled, backRow] });
      } else if (i.customId === 'p2last') {
        page = maxPage.p2;
        i.update({ embeds: [ts(p2Embeds[page])], components: [p2RowNextDisabled, backRow] });
      } else if (i.customId === 'modulp3') {
        page = 0;
        i.update({ embeds: [ts(p3Embeds[page])], components: [p3RowBackDisabled, backRow] });
      } else if (i.customId === 'p3next') {
        page += 1;
        i.update({ embeds: [ts(p3Embeds[page])], components: [page < maxPage.p3 ? p3Row : p3RowNextDisabled, backRow] });
      } else if (i.customId === 'p3prev') {
        page -= 1;
        i.update({ embeds: [ts(p3Embeds[page])], components: [page > 0 ? p3Row : p3RowBackDisabled, backRow] });
      } else if (i.customId === 'p3first') {
        page = 0;
        i.update({ embeds: [ts(p3Embeds[page])], components: [p3RowBackDisabled, backRow] });
      } else if (i.customId === 'p3last') {
        page = maxPage.p3;
        i.update({ embeds: [ts(p3Embeds[page])], components: [p3RowNextDisabled, backRow] });
      } else if (i.customId === 'back') {
        i.update({ embeds: [ts(materiEmbed)], components: [mainRow, endRow] });
      } else if (i.customId === 'end') {
        await i.update({});
        collector.stop('User clicked the end interaction button');
      } else {
        return;
      }
      collector.resetTimer();
    });

    let msg = await message.channel.send({ embeds: [ts(materiEmbed)], components: [mainRow, endRow] });

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
