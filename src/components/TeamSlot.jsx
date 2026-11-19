import TypeBadge from "./TypeBadge";

function TeamSlot(props) {
  if (!props.pokemon) {
    return (
      <div className="flex items-center gap-3 border-b border-[#232B40] py-3">
        <div className="h-14 w-14 rounded-full bg-[#0B0F1A] "></div>
        <p className="font-bold text-slate-400">Empty Slot</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 border-b border-[#232B40] py-3">
      <img
        src={props.pokemon.image}
        alt={props.pokemon.name}
        className="h-13 w-13 rounded-full bg-slate-800"
      />
      <div className="flex-1">
        <p className="font-bold capitalize text-[#F1F5F9]">
          {props.pokemon.name}
        </p>
        <div className="mt-1 flex gap-1">
          <TypeBadge type={props.pokemon.type1} />
          {props.pokemon.type2 && <TypeBadge type={props.pokemon.type2} />}
        </div>
      </div>
      <button
        onClick={props.onHapus}
        className="cursor-pointer rounded-lg bg-[#EF4444] px-3 py-2 text-sm font-bold text-[#0B0F1A]"
      >
        X
      </button>
    </div>
  );
}

export default TeamSlot;
