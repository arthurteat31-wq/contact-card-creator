import { Tag } from "@/types/contact";
import { cn } from "@/lib/utils";

interface ContactTagProps {
  tag: Tag;
  showFull?: boolean;
}

const colorStyles: Record<string, { bg: string; text: string }> = {
  orange: { bg: "bg-amber-100", text: "text-amber-700" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-700" },
  green: { bg: "bg-emerald-100", text: "text-emerald-700" },
  red: { bg: "bg-red-100", text: "text-red-700" },
  pink: { bg: "bg-pink-100", text: "text-pink-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-700" },
};

export const ContactTag = ({ tag, showFull = false }: ContactTagProps) => {
  const style = colorStyles[tag.color] || colorStyles.blue;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide",
        style.bg,
        style.text
      )}
    >
      {tag.emoji && <span className="text-[9px]">{tag.emoji}</span>}
      <span className={cn(!showFull && "max-w-[50px] truncate")}>
        {tag.label}
      </span>
    </span>
  );
};