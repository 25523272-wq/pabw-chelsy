const profil = {
  nama: "Chelsy",
  peran: "Mahasiswa Informatika & Penggemar K-Drama",
  keahlian: ["HTML5", "CSS3", "JavaScript ES6+", "K-Drama Review"],
  jumlahDramaDitonton: 7
};

const kalimatSapaan = `Halo! Saya ${profil.nama}, seorang ${profil.peran} yang telah mengulas ${profil.jumlahDramaDitonton} judul drama.`;
console.log(kalimatSapaan);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log("Perkenalan:", buatPerkenalan(profil));
console.log("Keahlian:", formatKeahlian(profil.keahlian));

const daftarDrama = [
  { judul: "The Trauma Code: Heroes on Call", genre: "Medical Drama", tahun: 2025, rating: "10/10", selesai: true },
  { judul: "Twenty-Five Twenty-One", genre: "Coming-of-age", tahun: 2022, rating: "9/10", selesai: true },
  { judul: "Resident Playbook", genre: "Medical", tahun: 2020, rating: "8/10", selesai: true },
  { judul: "Hometown Cha-Cha-Cha", genre: "Romance", tahun: 2021, rating: "9.5/10", selesai: true },
  { judul: "Can This Love Be Translated?", genre: "Romance", tahun: 2026, rating: "8.5/10", selesai: false },
  { judul: "Queen of Tears", genre: "Romance", tahun: 2024, rating: "9.2/10", selesai: true },
  { judul: "Bloodhounds", genre: "Action", tahun: 2023, rating: "10/10", selesai: true }
];

console.log("--- Tabel Keahlian ---");
console.table(profil.keahlian);

console.log("--- Tabel Seluruh K-Drama ---");
console.table(daftarDrama);

const dramaSelesai = daftarDrama.filter((drama) => drama.selesai);
console.log("--- Hasil Filter (Drama Selesai) ---");
console.table(dramaSelesai);

const dramaCarian = daftarDrama.find((drama) => drama.judul === "Queen of Tears");
console.log("--- Hasil Find (Queen of Tears) ---", dramaCarian);

const ringkasanDrama = daftarDrama.map((drama) => `${drama.judul} (${drama.rating})`);
console.log("--- Hasil Map (Ringkasan) ---", ringkasanDrama);

const dramaTerurutTahun = [...daftarDrama].sort((a, b) => b.tahun - a.tahun);
console.log("--- Hasil Sort (Berdasarkan Tahun Terbaru) ---");
console.table(dramaTerurutTahun);