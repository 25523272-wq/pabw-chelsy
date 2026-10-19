const wadahDaftar = document.querySelector("#daftar-proyek");
const barisFilter = document.querySelector("#baris-filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const muatEl = document.querySelector("#muat");

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
  // Wajib menggunakan drama.gambar agar sesuai dengan proyek.json milikmu
  img.src = drama.gambar || GAMBAR_DEFAULT;
  img.alt = drama.judul || "Poster K-Drama";
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
  if (!wadahDaftar) return;

  wadahDaftar.textContent = "";

  if (!daftar || daftar.length === 0) {
    if (pesanKosong) {
      pesanKosong.textContent = "Belum ada K-Drama di kategori ini.";
      pesanKosong.hidden = false;
    }
    return;
  }

  if (pesanKosong) pesanKosong.hidden = true;

  daftar.forEach((drama) => {
    wadahDaftar.append(buatKartu(drama));
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