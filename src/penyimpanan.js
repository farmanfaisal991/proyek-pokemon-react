function bacaPenyimpanan(kunci, nilaiAwal) {
  try {
    const teks = localStorage.getItem(kunci);
    if (teks === null) {
      return nilaiAwal;
    }
    return JSON.parse(teks);
  } catch (err) {
    return nilaiAwal;
  }
}

function simpanPenyimpanan(kunci, nilai) {
  try {
    localStorage.setItem(kunci, JSON.stringify(nilai));
  } catch (err) {
    console.log("Gagal menyimpan", err.massage);
  }
}

export { bacaPenyimpanan, simpanPenyimpanan };
