import TeamSlot from "./TeamSlot";
import SavedTeam from "./SavedTeam";

function TeamModal(props) {
  const slot = [];
  for (let i = 0; i < props.batasTim; i++) {
    slot.push(props.tim[i]);
  }

  const totalExp = props.tim.reduce((jumlah, n) => jumlah + n.exp, 0);

  return (
    <div
      onClick={props.onTutup}
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/60  "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] w-full max-w-xl
         flex-col rounded-t-3xl border border-[#232B40] bg-[#151B2B] animate-naik motion-reduce:animate-none"
      >
        <div className="flex border-b border-[#232B40] items-center justify-between p-4 bg-[#0B0F1A] rounded-t-3xl shrink-0">
          <h2 className="text-xl font-bold text-[#F1F5F9]">
            My Team({props.tim.length}/{props.batasTim})
          </h2>
          <button
            onClick={props.onTutup}
            className="cursor-pointer rounded-full border border-[#232B40] px-3 py-1 text-sm font-bold text-[#F1F5F9] hover:border-aksen"
          >
            Tutup
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {props.tim.length === 0 && (
            <p className="py-3 text-center text-sm text-slate-400">
              Tim masih kosong. Tekan "Add to Team" pada card untuk menambahkan
              pokemon.
            </p>
          )}
          {slot.map((pokemon, index) => (
            <TeamSlot
              key={pokemon ? pokemon.id : "kosong" + index}
              pokemon={pokemon}
              onHapus={() => props.onHapus(pokemon.id)}
            />
          ))}

          <div className="mt-4 mb-0.5 ">
            <h3 className="text-sm font-bold text-[#F1F5F9]">
              Tim Tersimpan ({props.timTersimpan.length})
            </h3>
            {props.timTersimpan.length === 0 && (
              <p className="mt-2 text-sm text-slate-400">
                Belum ada Tim Tersimpan.
              </p>
            )}
            <div className="mt-2 flex flex-col gap -2">
              {props.timTersimpan.map((t) => (
                <SavedTeam
                  key={t.id}
                  data={t}
                  onBuka={() => props.onBukaTim(t)}
                  onHapus={() => props.onHapusTimTersimpan(t.id)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={props.onHapusSemua}
            className="cursor-pointer rounded-full border w-full border-[#EF4444] text-xs font-bold text-[#EF4444] hover:bg-[#EF4444] hover:text-[#0B0F1A] "
          >
            Hapus Semua Data
          </button>
        </div>
        <div className="border-t border-[#232B40] p-4">
          <input
            value={props.namaTim}
            onChange={(e) => props.ubahNamaTim(e.target.value)}
            placeholder="Nama Tim"
            maxLength={30}
            className="w-full rounded-full border border-[#232B40] bg-[#0B0F1A] px-4 py -2 text-sm text-[#F1F5F9] outline-none placeholder:text-slate-400 focus:border-aksen"
          />
          {props.pesanTim.teks && (
            <p
              className={`mt-2 text-sm ${props.pesanTim.sukses ? "text-aksen" : "text-[#EF4444]"}`}
            >
              {props.pesanTim.teks}
            </p>
          )}
          <div className="flex flex-center justify-between">
            <button
              onClick={props.simpanTim}
              className="mt-3 w-full cursor-pointer rounded-full bg-aksen py-1  text-sm font-bold text-[#0B0F1A]"
            >
              Simpan Tim
            </button>
          </div>
        </div>
        <div className="flex  items-center justify-between gap-3 border-t border-[#232B40] p-4">
          <p className="font-bold text-[#F1F5F9]">Total Base EXP: {totalExp}</p>
          <button
            onClick={props.kosongkanTeam}
            className="cursor-pointer rounded-full border border-[#EF4444] px-3 py-1 text-xs font-bold text-[#EF4444] hover:bg-[#EF4444] hover:text-[#0B0F1A]"
          >
            Kosongkan Tim
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamModal;
