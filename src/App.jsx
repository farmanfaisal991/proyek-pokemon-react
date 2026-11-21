import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import { useState, useEffect, useMemo } from "react";
import { ambilPokemonDariNama, ambilSemuaNama } from "./api";
import DetailModal from "./components/DetailModal";
import TeamModal from "./components/TeamModal";
import { bacaPenyimpanan, simpanPenyimpanan } from "./penyimpanan";
import SkeletonCard from "./components/SkeletonCard";

const jumlahPerHalaman = 25;
const batasTim = 10;

function App() {
  const [daftarPokemon, setDaftarPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [semuaNama, setSemuaNama] = useState([]);
  const [kataCari, setKataCari] = useState("");
  const [idTerpilih, setIdTerpilih] = useState(null);
  const [tim, setTim] = useState(() => bacaPenyimpanan("deck-tim", []));
  const [timTerbuka, setTimTerbuka] = useState(false);
  const [namaTim, setNamaTim] = useState("");
  const [timTersimpan, setTimTersimpan] = useState(() =>
    bacaPenyimpanan("deck-tersimpan", []),
  );
  const [pesanTim, setPesanTim] = useState({ teks: "", sukses: false });
  const [percobaan, setPercobaan] = useState(0);

  function ubahNamaTim(teks) {
    setNamaTim(teks);
    setPesanTim({ teks: "", sukses: false });
  }

  function simpanTim() {
    const nama = namaTim.trim();
    if (nama === "") {
      setPesanTim({ teks: "Nama tim wajib diisi.", sukses: false });
      return;
    }
    if (tim.length === 0) {
      setPesanTim({ teks: "Tim masih kosong", sukses: false });
      return;
    }

    const timBaru = { id: Date.now(), nama: nama, anggota: tim };
    setTimTersimpan([...timTersimpan, timBaru]);
    setNamaTim("");
    setPesanTim({ teks: `Tim "${nama}" tersimpan.`, sukses: true });
  }

  function bukaTim(timTerpilih) {
    if (tim.length > 0) {
      const lanjut = window.confirm("Tim aktif akan diganti. Lanjutkan?");
      if (!lanjut) {
        return;
      }
    }
    setTim(timTerpilih.anggota);
    setNamaTim(timTerpilih.nama);
    setPesanTim({ teks: `Tim "${timTerpilih.nama}" dibuka.`, sukses: true });
  }

  function hapusTimTersimpan(id) {
    const timYangDihapus = timTersimpan.find((t) => t.id === id);
    setTimTersimpan(timTersimpan.filter((t) => t.id !== id));
    setPesanTim({
      teks: `Tim "${timYangDihapus.nama}" dihapus.`,
      sukses: false,
    });
  }

  function ubahKatCari(text) {
    setKataCari(text);
    setHalaman(1);
  }

  function tambahKeTim(pokemon) {
    const sudahAda = tim.some((p) => p.id === pokemon.id);
    if (sudahAda || tim.length >= batasTim) {
      return;
    }
    setTim([...tim, pokemon]);
  }

  function hapusDariTim(id) {
    setTim(tim.filter((p) => p.id !== id));
  }

  function kosongkanSemuaTeam() {
    setTim([]);
    setPesanTim({ teks: "Semua tim dikosongkan", sukses: false });
  }

  function hapusSemuaData() {
    const lanjut = window.confirm("yakin ingin menghapus semua data?");
    if (!lanjut) {
      return;
    }
    setTim([]);
    setTimTersimpan([]);
    if (timTersimpan.length === 0) {
      return setPesanTim({
        teks: "Tidak ada tim tersimpan yang dihapus",
        sukses: false,
      });
    }
    setPesanTim({ teks: "Semua data dihapus", sukses: false });
  }

  useEffect(() => {
    if (semuaNama.length > 0) {
      return;
    }
    async function muatNama() {
      setLoading(true);
      setError("");
      try {
        const nama = await ambilSemuaNama();
        setSemuaNama(nama);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    muatNama();
  }, [percobaan]);

  useEffect(() => {
    simpanPenyimpanan("deck-tim", tim);
  }, [tim]);

  useEffect(() => {
    simpanPenyimpanan("deck-tersimpan", timTersimpan);
  }, [timTersimpan]);

  const hasilCari = useMemo(() => {
    return semuaNama.filter((nama) =>
      nama.includes(kataCari.toLocaleLowerCase().trim()),
    );
  }, [semuaNama, kataCari]);

  const totalHalaman = Math.max(
    1,
    Math.ceil(hasilCari.length / jumlahPerHalaman),
  );

  useEffect(() => {
    if (semuaNama.length === 0) {
      return;
    }
    let masihBerlaku = true;

    async function muatData() {
      setLoading(true);
      setError("");
      try {
        const awal = (halaman - 1) * jumlahPerHalaman;
        const namaHalamanIni = hasilCari.slice(awal, awal + jumlahPerHalaman);
        const data = await ambilPokemonDariNama(namaHalamanIni);
        if (masihBerlaku) {
          setDaftarPokemon(data);
        }
      } catch (err) {
        if (masihBerlaku) {
          setError(err.message);
          setLoading(false);
        }
      } finally {
        if (masihBerlaku) {
          setLoading(false);
        }
      }
    }
    muatData();
    return () => {
      masihBerlaku = false;
    };
  }, [hasilCari, halaman, percobaan]);

  const tidakAdaHasil =
    !loading && !error && semuaNama.length > 0 && hasilCari.length === 0;

  const penandaSkeleton = [];
  for (let i = 0; i < jumlahPerHalaman; i++) {
    penandaSkeleton.push(i);
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] p-4 pb-24 pt-15 ">
      <div className="mx-auto max-w-6xl">
        <Header count={tim.length} max={batasTim} />
        <SearchBar kataCari={kataCari} setKataCari={ubahKatCari} />
        {kataCari && (
          <p className="mt-2 text-sm text-slate-400">
            Ditemukan {hasilCari.length} Pokémon
          </p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {loading && penandaSkeleton.map((i) => <SkeletonCard key={i} />)}
          {!loading &&
            !error &&
            daftarPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                type1={pokemon.type1}
                type2={pokemon.type2}
                exp={pokemon.exp}
                onKlik={() => setIdTerpilih(pokemon.id)}
                sudahDiTim={tim.some((p) => p.id === pokemon.id)}
                timPenuh={tim.length >= batasTim}
                onTambah={() => tambahKeTim(pokemon)}
              />
            ))}
        </div>
        {error && (
          <div className="mt-6 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-center">
            <p className="font-bold text-[#F1F5F9]">Gagal memuat data</p>
            <p className="mt-1 text-sm text-slate-400">
              Periksa koneksi internetmu, lalu coba lagi
            </p>
            <p className="mt-1 text-xs text-slate-400">{error}</p>
            <button
              onClick={() => setPercobaan(percobaan + 1)}
              className="mt-3 cursor-pointer rounded-full border border-aksen px-4 py-1 text-sm font-bold text-aksen hover:bg-aksen hover:text-[#0B0F1A]"
            >
              Coba lagi
            </button>
          </div>
        )}
        {tidakAdaHasil && (
          <p className=" mt-8 text-center text-slate-400">
            Tidak ada Pokemon yang cocok dengan "{kataCari}".
          </p>
        )}
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
        <button
          onClick={() => setTimTerbuka(true)}
          className="cursor-pointer rounded-lg border border-aksen  bg-transparent text-lg font-bold text-aksen hover:bg-aksen hover:text-[#0B0F1A] w-full p-2.5  "
        >
          View Team ({tim.length}/{batasTim})
        </button>
      </div>
      {idTerpilih && (
        <DetailModal
          idPokemon={idTerpilih}
          onTutup={() => setIdTerpilih(null)}
        />
      )}
      {timTerbuka && (
        <TeamModal
          tim={tim}
          batasTim={batasTim}
          onHapus={hapusDariTim}
          onTutup={() => setTimTerbuka(false)}
          kosongkanTeam={kosongkanSemuaTeam}
          namaTim={namaTim}
          ubahNamaTim={ubahNamaTim}
          simpanTim={simpanTim}
          pesanTim={pesanTim}
          timTersimpan={timTersimpan}
          onBukaTim={bukaTim}
          onHapusTimTersimpan={hapusTimTersimpan}
          onHapusSemua={hapusSemuaData}
        />
      )}
    </div>
  );
}

export default App;
