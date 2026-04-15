import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

interface Props {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  maxPrice,
  onPriceChange,
}: Props) => (
  <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border py-4 mb-8">
    <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={onCategoryChange}
      />
      <PriceFilter range={priceRange} maxPrice={maxPrice} onChange={onPriceChange} />
    </div>
  </div>
);

export default FilterBar;
