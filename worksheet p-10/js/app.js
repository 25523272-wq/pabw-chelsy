/*
export const daftarDrama = [
  {
    judul: "The Trauma Code: Heroes on Call",
    genre: "Medical, Action",
    rating: "10/10",
    gambar: "images/code.jpeg",
    selesai: true
  },
  {
    judul: "Twenty-Five Twenty-One",
    genre: "Coming-of-age, Romance",
    rating: "9/10",
    gambar: "images/code.jpeg",
    selesai: true
  },
  {
    judul: "Resident Playbook",
    genre: "Medical, Slice of Life",
    rating: "8/10",
    gambar: "images/resident.jpeg",
    selesai: true
  },
  {
    judul: "Hometown Cha-Cha-Cha",
    genre: "Romantic, Comedy",
    rating: "9.5/10",
    gambar: "images/hometown.jpeg",
    selesai: true
  },
  {
    judul: "Can This Love Be Translated?",
    genre: "Romantic, Comedy",
    rating: "8.5/10",
    gambar: "images/love.jpeg",
    selesai: false
  },
  {
    judul: "Queen of Tears",
    genre: "Romance, Drama",
    rating: "9.2/10",
    gambar: "images/Queen of Tears.jpeg",
    selesai: true
  },
  {
    judul: "Bloodhounds",
    genre: "Action, Crime",
    rating: "10/10",
    gambar: "images/BloodHounds.jpeg",
    selesai: true
  }
];
*/
import { ambilProyek } from './api.js';
import { render, pasangFilter, aturMemuat, tampilkanGalat } from './dom.js';

export const profil = {
  nama: "Chelsy Alfaddhillah",
  nim: "25523272",
  peran: "Mahasiswa Informatika & Penggemar K-Drama"
};

async function muat() {
  aturMemuat(true); 
  try {
    const daftar = await ambilProyek(); 
    pasangFilter(daftar);               
    render(daftar);                     
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error('Detail galat:', galat.message);
  } finally {
    aturMemuat(false); 
  }
}

muat();