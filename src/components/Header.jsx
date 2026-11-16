function Header(props) {
  return (
    <div className=" fixed top-0 left-0 right-0 bg-[#151B2B] border-t border-[#232B40] p-4 w-full flex justify-between items-center">
      <img
        src="./src/assets/logopokemon2.png"
        alt="logopokemon"
        className="h-9
        w-14 brightness-150 "
      />
      <h1 className="text-2xl font-bold text-aksen">Pokédex</h1>
      <p className="text-2xl font-bold text-aksen">
        {props.count}/{props.max}
      </p>
    </div>
  );
}
export default Header;
