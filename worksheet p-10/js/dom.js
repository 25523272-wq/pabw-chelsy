// js/dom.js - Lapisan Manipulasi DOM & Tampilan

const wadahDaftar = document.querySelector("#daftar-proyek");
const barisFilter = document.querySelector("#baris-filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const muatEl = document.querySelector("#muat");

const formTambah = document.querySelector("#form-tambah");
const inputJudul = document.querySelector("#input-judul");
const inputGenre = document.querySelector("#input-genre");
const inputRating = document.querySelector("#input-rating");
const inputGambar = document.querySelector("#input-gambar");
const galatJudul = document.querySelector("#galat-judul");
const tombolKirim = document.querySelector("#tombol-kirim");

const GAMBAR_DEFAULT = "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80";

export function aturMemuat(aktif) {
  if (muatEl) muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  if (wadahDaftar) wadahDaftar.textContent = "";
  if (pesanKosong) {
    pesanKosong.textContent = pesan;
    pesanKosong.hidden = false;
  }
}

function buatKartu(drama) {
  const li = document.createElement("li");
  li.className = "kartu";

  const posterBox = document.createElement("div");
  posterBox.className = "poster-box";

  const img = document.createElement("img");
  img.src = drama.gambar || GAMBAR_DEFAULT;
  img.alt = drama.judul;
  img.loading = "lazy";

  const badgeRating = document.createElement("span");
  badgeRating.className = "badge-rating";
  badgeRating.textContent = `★ ${drama.rating || '8.5/10'}`;

  const isSelesai = drama.selesai !== false;
  const badgeStatus = document.createElement("span");
  badgeStatus.className = isSelesai ? "badge-status selesai" : "badge-status belum";
  badgeStatus.textContent = isSelesai ? "Selesai" : "Watchlist";

  posterBox.append(img, badgeRating, badgeStatus);

  const infoBox = document.createElement("div");
  infoBox.className = "kartu-info";

  const h3 = document.createElement("h3");
  h3.className = "kartu-judul";
  h3.textContent = drama.judul; 

  const pGenre = document.createElement("p");
  pGenre.className = "kartu-genre";
  pGenre.textContent = drama.genre || "K-Drama";

  infoBox.append(h3, pGenre);
  li.append(posterBox, infoBox);
  return li;
}

export function render(daftar) {
  if (wadahDaftar) wadahDaftar.textContent = ""; 

  if (!daftar || daftar.length === 0) { 
    if (pesanKosong) {
      pesanKosong.textContent = "Belum ada K-Drama di kategori ini.";
      pesanKosong.hidden = false;
    }
    return;
  }

  if (pesanKosong) pesanKosong.hidden = true;

  daftar.forEach((drama) => { 
    if (wadahDaftar) wadahDaftar.append(buatKartu(drama));
  });
}

export function pasangFilter(daftar) {
  if (!barisFilter) return;
  
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;

    const kategori = tombol.dataset.kategori;

    document.querySelectorAll("#baris-filter button").forEach((t) => {
      t.classList.toggle("aktif", t === tombol);
    });

    const tersaring = daftar.filter((drama) => {
      if (kategori === "semua" || !kategori) return true;
      if (kategori === "selesai") return drama.kategori === "selesai" || drama.selesai === true;
      if (kategori === "belum") return drama.kategori === "belum" || drama.selesai === false;
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