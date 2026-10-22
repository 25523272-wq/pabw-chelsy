export const profil = {
  nama: "Chelsy Alfaddhillah",
  nim: "25523272",
  peran: "Mahasiswa Informatika & Penggemar K-Drama",
  keahlian: ["HTML/CSS", "JavaScript ES6", "Fetch API", "UI/UX Design"]
};

export function buatPerkenalan({ nama, peran }) {
  return `Halo! Saya ${nama}, ${peran}. Selamat datang di K-Drama Vault saya!`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export function saring(daftar, kategori) {
  if (!daftar || !Array.isArray(daftar)) return [];
  if (kategori === "semua" || !kategori) return daftar;
  if (kategori === "selesai") return daftar.filter((d) => d.kategori === "selesai" || d.selesai === true);
  if (kategori === "belum") return daftar.filter((d) => d.kategori === "belum" || d.selesai === false);
  if (kategori === "favorit") return daftar.filter((d) => d.isFavorit === true);
  return daftar;
}