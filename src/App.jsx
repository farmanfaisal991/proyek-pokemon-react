import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] p-4 pb-24">
      <div className="mx-auto max-w-6xl">
        <Header count={0} max={10} />
        <SearchBar />
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <PokemonCard
            id={1}
            name="Bulbasaur"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            type1="grass"
            type2="poison"
            exp={64}
          />
          <PokemonCard
            id={2}
            name="Ivysaur"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
            type1="grass"
            type2="poison"
            exp={142}
          />
          <PokemonCard
            id={3}
            name="Venusaur"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
            type1="grass"
            type2="poison"
            exp={236}
          />
          <PokemonCard
            id={4}
            name="Charmander"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            type1="fire"
            type2=""
            exp={62}
          />
          <PokemonCard
            id={5}
            name="Charmeleon"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
            type1="fire"
            type2=""
            exp={142}
          />
          <PokemonCard
            id={6}
            name="Charizard"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
            type1="fire"
            type2="flying"
            exp={240}
          />
           <PokemonCard
            id={7}
            name="Squirtle"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            type1="water"
            type2=""
            exp={63}
          />
           <PokemonCard
            id={8}
            name="Wartortle"
            image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
            type1="water"
            type2=""
            exp={142}
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#151B2B] border-t border-[#232B40] p-4 w-full">
        <button className="cursor-pointer rounded-full border border-[#3B82F6] bg-transparent text-lg font-bold text-[#3B82F6] hover:bg-[#3B82F6] hover:text-[#0B0F1A] w-full p-2.5 ">
          View Team (0/10)
        </button>
      </div>
    </div>
  );
}

export default App;
