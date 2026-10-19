const ALAMAT = 'data/proyek.json'; 

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    if (!respons.ok) {
      throw new Error('Gagal mengambil data, status HTTP: ' + respons.status);
    }
    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error('Galat di api.js:', galat.message);
    throw galat;
  }
}