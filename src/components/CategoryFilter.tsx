interface Props {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: Props) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onSelect("")}
      className={`px-4 py-2 rounded-full text-sm font-body transition-colors duration-200 border ${
        selected === ""
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:bg-accent"
      }`}
    >
      All
    </button>
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-4 py-2 rounded-full text-sm font-body capitalize transition-colors duration-200 border ${
          selected === cat
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-foreground border-border hover:bg-accent"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
