function DetailModal(props) {
  return (
    <div
      onClick={props.onTutup}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#232B40] bg-[#151B2B] p-6 "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#F1F5F9]">
            {" "}
            Detail #{props.idPokemon}
          </h2>
          <button
            onClick={props.onTutup}
            className="cursor-pointer rounded-full border border-[#232B40] px-3 py-1 text-sm font-bold text-[#F1F5F9] hover:border-aksen"
          >
            Tutup
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Isi detail menyusul di bagian B
        </p>
      </div>
    </div>
  );
}

export default DetailModal;
