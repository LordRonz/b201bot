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
  setInterval(() => {const newActivity = activities[Math.floor(Math.random() * activities.length)];client?.user?.setActivity(newActivity);
  }, 1000 * 60 * 15);
});

client.on('message', msg=>{
  console.log("message")
  console.log(msg.content)
  if(msg.content == "Tata Tertib") {
    msg.channel.send("Perintah yang tersedia \n 1. Tata Tertib Praktikum \n 2. Tata Tertib Laporan Praktikum");
  } else if(msg.content == "Tata Tertib Praktikum") {
    msg.channel.send("PERATURAN PEMBUATAN LAPORAN PRAKTIKUM\n - Ukuran kertas A4 dengan margin 4-3-3-3. (Toleransi 0.5)\n - Spacing 1,5. (Jumlah baris ada 26)\n - Bersih dan rapi.\n - Tulis tangan menggunakan bolpoin tinta berwarna biru.\n - Setiap Laporan yang ditulis tangan harus ditulis judul ditengah (Dasar Teori, Hasil Praktikum, Tugas Asistensi)\n - Boleh menggunakan tipe-x\n - Untuk kelas IUP semua yang ditulis tangan semua menggunakan bahasa inggris\n - Rincian laporan dengan urutan: \n - Cover Praktikum* (Tanggal jangan sampai tidak lengkap & Judul Praktikum UPPERCASE)\n - Lembar Monitoring*\n - Sebelum praktikum mohon diisi tanggal dan judul praktikum\n - Setelah asistensi mohon diisi Tanggal ACC, Nama asisten, TTD asisten\n - Modul Praktikum (Print/Fotocopy)*\n - Print bolak balik\n - Dasar Teori*\n - Tidak boleh spasi menjorok kedalam\n - Satu lembar full (justify) dan bolak balik\n - Hasil Praktikum berupa Deskripsi saat mengerjakan praktikum▪   Tugas Asistensi (source code untuk tugas coding/deskripsi tugas/jawaban pertanyaan asisten)\n - Laporan praktikum bertanda (*) dikumpulkan sebelum praktikum dimulaiTidak boleh melakukan plagiarisme");
  } else if(msg.content == "Tata Tertib Laporan") {
    msg.channel.send("PERATURAN PEMBUATAN LAPORAN PRAKTIKUM\n - Ukuran kertas A4 dengan margin 4-3-3-3. (Toleransi 0.5)\n - Spacing 1,5. (Jumlah baris ada 26)\n - Bersih dan rapi.\n - Tulis tangan menggunakan bolpoin tinta berwarna biru.\n - Setiap Laporan yang ditulis tangan harus ditulis judul ditengah (Dasar Teori, Hasil Praktikum, Tugas Asistensi)\n - Boleh menggunakan tipe-x\n - Untuk kelas IUP semua yang ditulis tangan semua menggunakan bahasa inggris\n - Rincian laporan dengan urutan: \n - Cover Praktikum* (Tanggal jangan sampai tidak lengkap & Judul Praktikum UPPERCASE)\n - Lembar Monitoring*\n - Sebelum praktikum mohon diisi tanggal dan judul praktikum\n - Setelah asistensi mohon diisi Tanggal ACC, Nama asisten, TTD asisten\n - Modul Praktikum (Print/Fotocopy)*\n - Print bolak balik\n - Dasar Teori*\n - Tidak boleh spasi menjorok kedalam\n - Satu lembar full (justify) dan bolak balik\n - Hasil Praktikum berupa Deskripsi saat mengerjakan praktikum▪   Tugas Asistensi (source code untuk tugas coding/deskripsi tugas/jawaban pertanyaan asisten)\n - Laporan praktikum bertanda (*) dikumpulkan sebelum praktikum dimulaiTidak boleh melakukan plagiarisme");
  }
})


client.login(token);
