import { useState, useEffect } from "react";
import { ambilDetail } from "../api";
import TypeBadge from "./TypeBadge";

const labelStat = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

function DetailModal(props) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let masihBerlaku = true;

    async function muatDetail() {
      setLoading(true);
      setError("");
      try {
        const data = await ambilDetail(props.idPokemon);
        if (masihBerlaku) {
          setDetail(data);
        }
      } catch (err) {
        if (masihBerlaku) {
          setError(err.message);
          console.log(err);
        }
      } finally {
        if (masihBerlaku) {
          setLoading(false);
        }
      }
    }
    muatDetail();

    return () => {
      masihBerlaku = false;
    };
  }, [props.idPokemon]);

  return (
    <div
      onClick={props.onTutup}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#232B40] bg-[#151B2B] p-6 "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#F1F5F9]">
            Detail #{props.idPokemon}
          </h2>
          <button
            onClick={props.onTutup}
            className="cursor-pointer rounded-full border border-[#232B40] px-3 py-1 text-sm font-bold text-[#F1F5F9] hover:border-aksen"
          >
            Tutup
          </button>
        </div>
        {loading && (
          <p className="mt-4 text-sm text-slate-400">Memuat detail...</p>
        )}
        {error && <p className="mt-4 text-sm text-[#EF4444]">{error}</p>}

        {detail && (
          <div>
            <div className="mt-4 text-center">
              <img
                src={detail.image}
                alt={detail.name}
                className="mx-auto  h-40 w-40"
              />
              <h3 className="mt-2 text-2xl font-bold capitalize text-[#F1F5F9] ">
                {detail.name}
              </h3>
              <div className="mt-2 flex justify-center gap-2">
                <TypeBadge type={detail.type1} />
                {detail.type2 && <TypeBadge type={detail.type2} />}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-[#0B0F1A] p-3">
                <p className="text-xs text-slate-400">Tinggi</p>
                <p className="font-bold text-[#F1F5F9]">{detail.tinggi} m</p>
              </div>
              <div className="rounded-xl bg-[#0B0F1A] p-3">
                <p className="text-xs text-slate-400">Berat</p>
                <p className="font-bold text-[#F1F5F9]">{detail.berat} kg</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-[#0B0F1A] p-3 text-center">
              <p className="text-xs text-slate-400 ">Kemampuan</p>
              <p className="mt-1 flex flex-wrap justify-center gap-2">
                {detail.abilities.map((a) => (
                  <span
                    key={a.name}
                    className={`rounded-full px-3 py-1 font-bold capitalize ${a.tersembunyi ? "bg-[#F59E0B] text-[#0B0F1A]" : "bg-[#232B40] text-[#F1F5F9]"}`}
                  >
                    {a.nama}
                  </span>
                ))}
                {detail.abilities.some((n) => n.tersembunyi) && (
                  <p className="text-xs text-slate-400 ">
                    Warna Kuning = kemampuan tersembunyi
                  </p>
                )}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {detail.stats.map((s) => (
                <div key={s.nama}>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">
                      {labelStat[s.nama] || s.nama}
                    </span>
                    <span className="font-bold text-[#F1F5F9]">{s.nilai}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-b-full bg-[#0B0F1A]">
                    <div
                      className="h-2 rounded-full bg-aksen"
                      style={{
                        width: `${Math.min(100, (s.nilai / 250) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailModal;
