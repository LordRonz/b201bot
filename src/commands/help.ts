import { Message } from 'discord.js';
import { CustomClient, Command } from '../client';
import { author, footer, prefix } from '../config/config';

const helpEmbed = {
  color: 0x00ff00,
  title: 'Daftar Command',
  author,
  description: `Dibawah ini adalah daftar command dari bot ini. Prefix = ${prefix}`,
  thumbnail: {
    url: 'https://lh3.googleusercontent.com/proxy/56ZtgToeHkXeLekVWjVXjncBFYcf1y3J3qWG1OURKCEJ81SUsxQXdIvFzoleo2Tz75H6P-D90HH6RFFphkB4dwvVWRqclYoa',
  },
  fields: [
    {
      name: `${prefix}help`,
      value: 'Menampilkan pesan ini',
    },
    {
      name: `${prefix}tatatertib`,
      value: 'Menampilkan tata tertib praktikum Algoritma Pemrograman',
    },
    {
      name: `${prefix}materi`,
      value: 'Menampilkan materi dari tiap-tiap modul pada praktikum.',
    },
    {
      name: `${prefix}ping`,
      value: 'Buat ngeping.',
    },
  ],
  footer,
};

const help: Command = {
  run: async (client: CustomClient, message: Message): Promise<void> => {
    message.channel.send({ embeds: [{ ...helpEmbed, timestamp: new Date() }] });
  },
};

export default help;
