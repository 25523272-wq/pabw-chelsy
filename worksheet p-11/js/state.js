import { render } from './dom.js';

const KUNCI = "chelsy-kdrama-p11s";
const VERSI = 2;

export const state = {
  kategoriAktif: "semua",
  favorit: [],       
  daftarProyek: []
};

export function simpan(stateData) {
  const isi = {
    versi: VERSI,
    kategoriAktif: stateData.kategoriAktif,
    favorit: stateData.favorit
  };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI); 
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);   
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi) return;
  if (isi.kategoriAktif) state.kategoriAktif = isi.kategoriAktif;
  if (Array.isArray(isi.favorit)) state.favorit = isi.favorit;
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}


export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  render(state);
}

export function pilihKategori(kategori) {
  state.kategoriAktif = kategori;
  simpan(state);
  render(state);
}

export function toggleFavorit(id) {
  const numId = Number(id);
  if (state.favorit.includes(numId)) {
    state.favorit = state.favorit.filter((fId) => fId !== numId);
  } else {
    state.favorit = [...state.favorit, numId];
  }
  simpan(state);
  render(state);
}