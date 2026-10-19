import { tambahDramaBaru, tetapkanFilter } from './state.js';
import { render } from './dom.js';

const formTambah = document.querySelector("#form-tambah");
const inputJudul = document.querySelector("#input-judul");
const inputGenre = document.querySelector("#input-genre");
const inputRating = document.querySelector("#input-rating");
const inputGambar = document.querySelector("#input-gambar");
const galatJudul = document.querySelector("#galat-judul");
const tombolKirim = document.querySelector("#tombol-kirim");
const barisFilter = document.querySelector("#baris-filter");

export function pasangEvent() {
  if (inputJudul) {
    inputJudul.addEventListener("input", () => {
      const valid = inputJudul.value.trim() !== "";
      inputJudul.setAttribute("aria-invalid", !valid);
      if (galatJudul) galatJudul.hidden = valid;
      if (tombolKirim) tombolKirim.disabled = !valid;
    });
  }

  if (formTambah) {
    formTambah.addEventListener("submit", (e) => {
      e.preventDefault();
      const judul = inputJudul.value.trim();
      if (!judul) return;

      const dramaBaru = {
        id: Date.now(),
        judul: judul,
        genre: inputGenre ? inputGenre.value.trim() || "K-Drama" : "K-Drama",
        rating: inputRating ? inputRating.value.trim() || "9.0/10" : "9.0/10",
        gambar: inputGambar && inputGambar.value.trim() ? inputGambar.value.trim() : "images/code.jpeg",
        kategori: "selesai",
        selesai: true
      };

      tambahDramaBaru(dramaBaru);
      render();

      formTambah.reset();
      if (tombolKirim) tombolKirim.disabled = true;
    });
  }

  if (barisFilter) {
    barisFilter.addEventListener("click", (e) => {
      const tombol = e.target.closest("button");
      if (!tombol) return;

      const kategori = tombol.dataset.kategori;
      tetapkanFilter(kategori);

      document.querySelectorAll("#baris-filter button").forEach((t) => {
        t.classList.toggle("aktif", t === tombol);
      });

      render();
    });
  }
}