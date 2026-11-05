import TypeBadge from "./TypeBadge";
import typeStyles from "../typeStyles";

function PokemonCard(props) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${typeStyles[props.type1].card}`}
    >
      <p
        className="
        text-xs text-slate-400 text-left"
      >
        #{props.id}
      </p>
      <p className="mt-2 text-xs text-slate-400 text-left">{props.exp} XP</p>
      <img
        src={props.image}
        alt={props.name}
        className="
        mx-auto h-24 w-24"
      />
      <h2 className="mt-2 text-lg font-bold text-[#F1F5F9]">
        {props.name}
        <div className="mt-2 flex justify-center gap-2">
          <TypeBadge type={props.type1} />
          {props.type2 && <TypeBadge type={props.type2} />}
        </div>

        <button className="mt-3 w-full rounded-lg bg-[#3B82F6] py-2 text-sm font-bold text-[#0B0F1A] cursor-pointer">
          Add to team
        </button>
      </h2>
    </div>
  );
}

export default PokemonCard;
