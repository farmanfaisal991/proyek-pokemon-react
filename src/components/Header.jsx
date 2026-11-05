function Header(props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#3B82F6]">Pokédex</h1>
      <p className="text-2xl font-bold text-[#3B82F6]">{props.count}/{props.max}</p>
    </div>
  );
}
export default Header;
