import { Slider } from "@/components/ui/slider";

interface Props {
  range: [number, number];
  maxPrice: number;
  onChange: (range: [number, number]) => void;
}

const PriceFilter = ({ range, maxPrice, onChange }: Props) => (
  <div className="flex items-center gap-4">
    <span className="text-sm text-muted-foreground font-body whitespace-nowrap">
      ${range[0].toFixed(0)} – ${range[1].toFixed(0)}
    </span>
    <Slider
      min={0}
      max={Math.ceil(maxPrice)}
      step={1}
      value={range}
      onValueChange={(v) => onChange(v as [number, number])}
      className="w-48"
    />
  </div>
);

export default PriceFilter;
