import TypeBadge from "./TypeBadge";
import typeStyles from "../typeStyles";

function PokemonCard(props) {
  let textTombol = "Add to Team";
  if (props.sudahDiTim) {
    textTombol = "Added";
  } else if (props.timPenuh) {
    textTombol = "Tim Penuh";
  }

  return (
    <div
      onClick={props.onKlik}
      className={`cursor-pointer rounded-xl border p-4 text-center ${typeStyles[props.type1].card}`}
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
      <h2 className="mt-2 text-lg font-bold text-[#F1F5F9] capitalize">
        {props.name}
      </h2>
      <div className="mt-2 flex justify-center flex-col  sm:flex-row gap-2">
        <TypeBadge type={props.type1} />
        {props.type2 && <TypeBadge type={props.type2} />}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.onTambah();
        }}
        disabled={props.sudahDiTim || props.timPenuh}
        className="mt-3 w-full rounded-lg bg-aksen py-2 text-sm font-bold text-[#0B0F1A] enabled:cursor-pointer disabled:opacity-50"
      >
        {textTombol}
      </button>
    </div>
  );
}

export default PokemonCard;
