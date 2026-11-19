function SavedTeam(props) {
  return (
    <div className="rounded-xl border border-[#232B40] bg-[#0B0F1A] p-3">
      <div className="flex items-center justify-between gap-2 overflow-y-auto">
        <div className="min-w-0 ">
          <p className="truncate font-bold text-[#F1F5F9]">{props.data.nama}</p>
          <p className="text-xs text-slate-400">
            {props.data.anggota.length} pokemon
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={props.onBuka}
            className="cursor-pointer rounded-full border border-aksen px-3 py-1 text-xs font-bold text-aksen hover:bg-aksen hover:text-[#0B0F1A]"
          >
            Buka
          </button>
          <button
            onClick={props.onHapus}
            className="cursor-pointer rounded-full border border-[#EF4444] px-3 py-1 text-xs font-bold text-[#F1F5F9] hover:bg-[#EF4444] hover:text-[#0B0F1A]"
          >
            Hapus
          </button>
        </div>
      </div>
      <div className="mt-2 flex flexe-wrap gap-1">
        {props.data.anggota.map((p) => (
          <img
            key={p.id}
            src={p.image}
            alt={p.name}
            className="h-8 w-8 rounded-full bg-slate-800"
          />
        ))}
      </div>
    </div>
  );
}

export default SavedTeam;
