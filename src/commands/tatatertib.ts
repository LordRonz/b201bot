import { Message, MessageButton, MessageActionRow } from 'discord.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CustomClient, Command } from '../client';

const author = {
  name: 'B201Lab',
  icon_url:
    'https://lh3.googleusercontent.com/proxy/rzGmZBrM8c9nSWUOGdF5fjf9v3AGJrHZMf1v06n0GpcyUNFSdgzHdjZe--eW3jz0RmbIq9HVE2eeF3zU7eXLn6apGmXKn4Oe',
  url: 'http://b201.telematics.its.ac.id/',
};

const tatatertibEmbed = {
  color: 0xff0000,
  title: 'Tata Tertib',
  url: 'https://discord.js.org',
  author,
  description: readFileSync(join(__dirname, '/txts/tatatertibDescription.txt'), 'utf-8'),
  timestamp: new Date(),
};

const tatatertibPraktikumEmbed = {
  color: 0xff0000,
  title: 'Tata Tertib Praktikum',
  author,
  description: readFileSync(join(__dirname, '/txts/tatatertibPraktikumDescription.txt'), 'utf-8'),
  timestamp: new Date(),
};

const tatatertibLaporanEmbed = {
  color: 0xff0000,
  title: 'Tata Tertib Laporan',
  author,
  description: readFileSync(join(__dirname, '/txts/tatatertibLaporanDescription.txt'), 'utf-8'),
  timestamp: new Date(),
};

const contohLaporanPraPraktkumEmbed = {
  color: 0xff0000,
  title: 'Contoh Laporan Pra Praktikum.pdf',
  url: 'https://drive.google.com/file/d/11MEQm5nxCET5EX2FfrS6u8fJXMJFRJ9g/view?usp=sharing',
  author,
  timestamp: new Date(),
};

const contohLaporanLengkap = {
  color: 0xff0000,
  title: 'Contoh Laporan Lengkap.pdf',
  url: 'https://drive.google.com/file/d/1xZOY3EolFyQUqXzQsmEtYRmW0GoJOmfu/view?usp=sharing',
  author,
  timestamp: new Date(),
};

const row = new MessageActionRow().addComponents(
  new MessageButton().setCustomId('praktikum').setLabel('Praktikum').setStyle('PRIMARY'),
  new MessageButton().setCustomId('laporan').setLabel('Laporan').setStyle('PRIMARY'),
  new MessageButton().setCustomId('contoh-laporan-prapraktikum').setLabel('Laporan Pra Praktikum').setStyle('PRIMARY'),
  new MessageButton()
    .setCustomId('contoh-laporan-lengkap-praktikum')
    .setLabel('Laporan Lengkap Praktikum')
    .setStyle('PRIMARY')
);

const tatatertib: Command = {
  run: async (client: CustomClient, message: Message): Promise<void> => {
    const collector = message.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

    collector.on('collect', async (i) => {
      if (i.customId === 'praktikum') {
        i.reply({ embeds: [tatatertibPraktikumEmbed] });
        collector.resetTimer();
      } else if (i.customId === 'laporan') {
        i.reply({ embeds: [tatatertibLaporanEmbed] });
        collector.resetTimer();
      } else if (i.customId === 'contoh-laporan-prapraktikum') {
        i.reply({ embeds: [contohLaporanPraPraktkumEmbed] });
        collector.resetTimer();
      } else if (i.customId === 'contoh-laporan-lengkap-praktikum') {
        i.reply({ embeds: [contohLaporanLengkap] });
        collector.resetTimer();
      }
    });

    let msg = await message.channel.send({ embeds: [tatatertibEmbed], components: [row] });

    collector.on('end', async () => {
      msg = await msg.fetch();
      msg.components.forEach((messageActionRow) => {
        messageActionRow.components.forEach((component) => {
          component.setDisabled();
        });
      });
      msg.edit({ embeds: msg.embeds, components: msg.components });
    });
  },
  aliases: ['tatib'],
};

export default tatatertib;
