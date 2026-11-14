async function ambilPokemon(idAtauNama) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idAtauNama}`,
  );

  if (!response.ok) {
    throw new Error(`Gagal mengambil data (status ${response.status})`);
  }

  const pokemon = await response.json();
  return pokemon;
}

function rapikanPokemon(data) {
  let type2 = "";
  if (data.types.length > 1) {
    type2 = data.types[1].type.name;
  }

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    type1: data.types[0].type.name,
    type2: type2,
    exp: data.base_experience,
  };
}

function rapikanDetail(data) {
  const dasar = rapikanPokemon(data);

  return {
    id: dasar.id,
    name: dasar.name,
    image: dasar.image,
    type1: dasar.type1,
    type2: dasar.type2,
    exp: dasar.exp,
    tinggi: data.height / 10,
    berat: data.weight / 10,
    stats: data.stats.map((s) => ({
      nama: s.stat.name,
      nilai: s.base_stat,
    })),
    abilities: data.abilities.map((a) => a.ability.name),
  };
}

async function ambilDetail(id) {
  const data = await ambilPokemon(id);
  return rapikanDetail(data);
}

// async function ambilBanyakPokemon(idAwal, jumlah) {
//   const daftarId = [];
//   for (let id = idAwal; id < idAwal + jumlah; id++) {
//     daftarId.push(id);
//   }
//   const daftarJanji = daftarId.map((id) => ambilPokemon(id));
//   const hasil = await Promise.all(daftarJanji);

//   return hasil.map((data) => rapikanPokemon(data));
// }

async function ambilPokemonDariNama(daftarNama) {
  const daftarJanji = daftarNama.map((nama) => ambilPokemon(nama));
  const hasil = await Promise.all(daftarJanji);

  return hasil.map((data) => rapikanPokemon(data));
}

async function ambilSemuaNama() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0",
  );

  if (!response.ok) {
    throw new Error(`Gagal mengambil daftar nama (staus ${response.status})`);
  }
  const data = await response.json();
  return data.results.map((item) => item.name);
}

export {
  ambilPokemon,
  ambilPokemonDariNama,
  rapikanPokemon,
  ambilSemuaNama,
  ambilDetail,
};
