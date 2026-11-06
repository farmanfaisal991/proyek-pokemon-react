import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import { ambilPokemon, ambilBanyakPokemon } from "./api";

const jumlahPerHalaman = 25;
const totalPokemon = 1025;
const totalHalaman = Math.ceil(totalPokemon / jumlahPerHalaman);

function App() {
  const [daftarPokemon, setDaftarPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [halaman, setHalaman] = useState(1);

  useEffect(() => {
    async function muatData() {
      setLoading(true);
      setError("");
      try {
        const idAwal = (halaman - 1) * jumlahPerHalaman + 1;
        const sisa =totalPokemon - idAwal + 1
        const jumlah =Math.min( sisa , jumlahPerHalaman )
        const data = await ambilBanyakPokemon(idAwal,jumlah  );
        setDaftarPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    muatData();
  }, [halaman]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] p-4 pb-24 pt-15">
      <div className="mx-auto max-w-6xl">
        <Header count={0} max={10} />
        <SearchBar />
        {loading && (
          <p className="mt-2 text-sm text-slate-400">Memuat data...</p>
        )}
        {error && <p className="mt-2 text-sm text-[#EF4444]">{error}</p>}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 capitalize">
          {daftarPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type1={pokemon.type1}
              type2={pokemon.type2}
              exp={pokemon.exp}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setHalaman(halaman - 1)}
            disabled={halaman === 1 || loading}
            className="rounded-full border border-[#232B40] px-4 py-2 text-sm font-bold text-[#F1F5F9] enabled:cursor-pointer enabled:hover:border-aksen disabled:opacity-40"
          >
            Prev
          </button>
          <p className="text-sm text-slate-400">
            Halaman {halaman} / {totalHalaman}
          </p>
          <button
            onClick={() => setHalaman(halaman + 1)}
            disabled={halaman === totalHalaman || loading}
            className="rounded-full border border-[#232B40] px-4 py-2 text-sm font-bold text-[#F1F5F9] enabled:cursor-pointer enabled:hover:border-aksen disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-[#151B2B] border-t border-[#232B40] p-4 w-full">
        <button className="cursor-pointer rounded-lg border border-aksen  bg-transparent text-lg font-bold text-aksen hover:bg-aksen hover:text-[#0B0F1A] w-full p-2.5 ">
          View Team (0/10)
        </button>
      </div>
    </div>
  );
}

export default App;
