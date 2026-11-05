async function ambilPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  if (!response.ok) {
    throw new Error(`Gagal mengambil data (status ${response.status})`)
  }

  const pokemon = await response.json()
  return pokemon
}


export { ambilPokemon };