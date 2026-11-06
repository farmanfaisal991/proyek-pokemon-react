function SearchBar() {
  return (
    <div className="bg-[#151B2B] rounded-full p-1 mt-3 ">
      <input
        className=" border border-[#232B40]  rounded-full w-full text-[#F1F5F9] py-1 px-3  outline-none focus:border-aksen focus:border-2 placeholder:text-slate-400"
        type="text"
        placeholder="cari nama pokemon yang ingin di cari"
      />
    </div>
  );
}

export default SearchBar;
