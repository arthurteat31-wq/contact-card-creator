import { Tag } from "@/types/contact";
import { cn } from "@/lib/utils";

interface ContactTagProps {
  tag: Tag;
  showFull?: boolean;
}

const colorClasses = {
  orange: "bg-tag-orange-bg text-tag-orange border-tag-orange/30",
  yellow: "bg-tag-yellow-bg text-tag-yellow-dark border-tag-yellow/30",
  green: "bg-tag-green-bg text-tag-green border-tag-green/30",
  red: "bg-tag-red-bg text-tag-red border-tag-red/30",
  pink: "bg-tag-pink-bg text-tag-pink border-tag-pink/30",
  blue: "bg-tag-blue-bg text-tag-blue border-tag-blue/30",
};

export const ContactTag = ({ tag, showFull = false }: ContactTagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        colorClasses[tag.color]
      )}
    >
      {tag.emoji && <span>{tag.emoji}</span>}
      <span className={cn(!showFull && "max-w-[60px] truncate")}>
        {tag.label}
      </span>
    </span>
  );
};
