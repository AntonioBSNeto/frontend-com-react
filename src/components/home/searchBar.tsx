import { MdOutlineSearch } from "react-icons/md";

interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Searchbar = ({ searchTerm, onSearchChange }: SearchbarProps) => {
  return (
    <div className="flex w-full py-2 px-4 border-2 bg-white border-blue-light rounded-lg gap-3">
      <MdOutlineSearch className="text-blue-light k w-6 h-6 " />
      <input
        className="outline-none font-medium text-blue-light w-full"
        type="text"
        name="search"
        id="search"
        placeholder="Buscar colaborador"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};
