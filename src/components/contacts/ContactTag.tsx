import { Tag } from "@/types/contact";
import { cn } from "@/lib/utils";

interface ContactTagProps {
  tag: Tag;
  showFull?: boolean;
}

const colorClasses = {
  orange: "bg-amber-100 text-amber-700",
  yellow: "bg-yellow-100 text-yellow-700",
  green: "bg-emerald-100 text-emerald-700",
  red: "bg-red-100 text-red-700",
  pink: "bg-pink-100 text-pink-700",
  blue: "bg-blue-100 text-blue-700",
};

export const ContactTag = ({ tag, showFull = false }: ContactTagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold",
        colorClasses[tag.color]
      )}
    >
      {tag.emoji && <span className="text-[10px]">{tag.emoji}</span>}
      <span className={cn(!showFull && "max-w-[60px] truncate")}>
        {tag.label}
      </span>
    </span>
  );
};
