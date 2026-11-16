import TeamSlot from "./TeamSlot";

function TeamModel(props) {
  const slot = [];
  for (let i = 0; i < props.batasTim; i++) {
    slot.push(props.tim[i]);
  }

  const totalExp = props.tim.reduce((jumlah, n) => jumlah + n.exp, 0);

  return (
    <div onClick={props.onTutup} className="fixed inset-0 z-50 bg-black/60">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl border border-[#232B40] bg-[#151B2B] animate-naik"
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-[#F1F5F9]">
            My Team({props.tim.lenght}/{props.batasTim})
          </h2>
          <button
            onClick={props.onTutup}
            className="cursor-pointer rounded-full border border-[#232B40] px-3 py-1 text-sm font-bold text-[#F1F5F9] hover:border-aksen"
          >
            Tutup
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {slot.map((pokemon, index) => (
            <TeamSlot
              key={pokemon ? pokemon.id : "kosong" + index}
              pokemon={pokemon}
              onHapus={() => props.onHapus(pokemon.id)}
            />
          ))}
        </div>

        <div className="border-t border-[#232B40] p-4 text-center">
          <p className="font-bold text-[#F1F5F9]">Total Base EXP :{totalExp}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamModel;
