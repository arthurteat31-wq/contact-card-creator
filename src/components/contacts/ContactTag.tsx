import { Tag } from "@/types/contact";
import { cn } from "@/lib/utils";

interface ContactTagProps {
  tag: Tag;
  showFull?: boolean;
}

const colorStyles = {
  orange: {
    bg: "bg-gradient-to-r from-amber-100 to-orange-100",
    text: "text-amber-700",
    dot: "bg-amber-500"
  },
  yellow: {
    bg: "bg-gradient-to-r from-yellow-100 to-amber-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500"
  },
  green: {
    bg: "bg-gradient-to-r from-emerald-100 to-green-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500"
  },
  red: {
    bg: "bg-gradient-to-r from-red-100 to-rose-100",
    text: "text-red-700",
    dot: "bg-red-500"
  },
  pink: {
    bg: "bg-gradient-to-r from-pink-100 to-rose-100",
    text: "text-pink-700",
    dot: "bg-pink-500"
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-100 to-indigo-100",
    text: "text-blue-700",
    dot: "bg-blue-500"
  },
};

export const ContactTag = ({ tag, showFull = false }: ContactTagProps) => {
  const style = colorStyles[tag.color];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide",
        "shadow-sm",
        style.bg,
        style.text
      )}
    >
      {tag.emoji ? (
        <span className="text-[9px]">{tag.emoji}</span>
      ) : (
        <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
      )}
      <span className={cn(!showFull && "max-w-[55px] truncate")}>
        {tag.label}
      </span>
    </span>
  );
};