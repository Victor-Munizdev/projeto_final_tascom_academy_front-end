interface Props {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Buscar portfólios..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  )
}
