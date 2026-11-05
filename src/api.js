async function ambilPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

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

async function ambilBanyakPokemon(idAwal, jumlah) {
  const daftarId = [];
  for (let id = idAwal; id < idAwal + jumlah; id++) {
    daftarId.push(id);
  }
  const daftarJanji = daftarId.map((id) => ambilPokemon(id));
  const hasil = await Promise.all(daftarJanji);

  return hasil.map((data) => rapikanPokemon(data));
}
export { ambilPokemon, ambilBanyakPokemon, rapikanPokemon };
