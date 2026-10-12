import { daftarDrama } from "./app.js";

const wadahDaftar = document.querySelector("#daftar-proyek");
const barisFilter = document.querySelector("#baris-filter");
const pesanKosong = document.querySelector("#pesan-kosong");

const formTambah = document.querySelector("#form-tambah");
const inputJudul = document.querySelector("#input-judul");
const inputGenre = document.querySelector("#input-genre");
const inputRating = document.querySelector("#input-rating");
const galatJudul = document.querySelector("#galat-judul");
const tombolKirim = document.querySelector("#tombol-kirim");

function buatKartu(drama) {
  const li = document.createElement("li");
  li.className = "kartu";

  const genreText = drama.genre ? ` — ${drama.genre}` : "";
  const ratingText = drama.rating ? ` (${drama.rating})` : "";
  li.textContent = `${drama.judul}${genreText}${ratingText}`;

  return li;
}

function render(daftar) {
  if (wadahDaftar) {
    wadahDaftar.textContent = "";
  }
  if (!daftar || daftar.length === 0) {
    if (pesanKosong) pesanKosong.hidden = false;
    return;
  }

  if (pesanKosong) pesanKosong.hidden = true;
  daftar.forEach((drama) => {
    if (wadahDaftar) {
      wadahDaftar.append(buatKartu(drama));
    }
  });
}

render(daftarDrama);


if (barisFilter) {
  
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return; 

    const kategori = tombol.dataset.kategori;

    document.querySelectorAll("#baris-filter button").forEach((t) => {
      t.classList.toggle("aktif", t === tombol);
    });


    const tersaring = daftarDrama.filter((drama) => {
      if (kategori === "semua" || !kategori) return true;
      if (kategori === "selesai") return drama.selesai === true;
      if (kategori === "belum") return drama.selesai === false;
      return true;
    });

    render(tersaring);
  });
}
if (inputJudul) {
  inputJudul.addEventListener("input", () => {
    const isiJudul = inputJudul.value.trim();

    if (isiJudul === "") {
      inputJudul.setAttribute("aria-invalid", "true");
      if (galatJudul) galatJudul.hidden = false;
      if (tombolKirim) tombolKirim.disabled = true;
    } else {
      inputJudul.setAttribute("aria-invalid", "false");
      if (galatJudul) galatJudul.hidden = true;
      if (tombolKirim) tombolKirim.disabled = false;
    }
  });
}

if (formTambah) {
  formTambah.addEventListener("submit", (event) => {
    event.preventDefault();

    const judulVal = inputJudul ? inputJudul.value.trim() : "";
    const genreVal = inputGenre ? inputGenre.value.trim() : "Drama";
    const ratingRaw = inputRating ? inputRating.value.trim() : "8.0";

    if (judulVal === "") {
      if (galatJudul) galatJudul.hidden = false;
      if (inputJudul) inputJudul.focus();
      return;
    }

    if (galatJudul) galatJudul.hidden = true;

    const ratingFormatted = ratingRaw.includes("/10") ? ratingRaw : `${ratingRaw}/10`;

    const dramaBaru = {
      judul: judulVal,
      genre: genreVal || "Drama",
      rating: ratingFormatted,
      selesai: true
    };

    daftarDrama.push(dramaBaru);

    render(daftarDrama);

    formTambah.reset();
    if (tombolKirim) tombolKirim.disabled = true;
  });
}