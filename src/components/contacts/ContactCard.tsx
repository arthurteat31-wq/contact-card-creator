import { Contact } from "@/types/contact";
import { ContactTag } from "./ContactTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageCircle, Pin } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  isSelected?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export const ContactCard = ({
  contact,
  isSelected,
  onClick,
  onContextMenu,
}: ContactCardProps) => {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const visibleTags = contact.tags.slice(0, 2);
  const remainingTags = contact.tags.length - 2;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 px-4 py-4 cursor-pointer",
        "transition-all duration-200 ease-out",
        "hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent",
        "border-l-2 border-l-transparent",
        isSelected && "bg-gradient-to-r from-primary/8 to-primary/3 border-l-primary",
        contact.isPinned && "bg-amber-50/50"
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {/* Unread indicator */}
      {contact.isUnread && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}

      {/* Avatar with platform badge */}
      <div className="relative flex-shrink-0">
        <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-whatsapp flex items-center justify-center ring-2 ring-white shadow-sm">
          <MessageCircle className="w-2.5 h-2.5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className={cn(
              "font-semibold text-foreground truncate",
              contact.isUnread && "text-foreground"
            )}>
              {contact.name}
            </h3>
            {contact.isPinned && (
              <Pin className="w-3 h-3 text-amber-500 flex-shrink-0 fill-amber-500" />
            )}
          </div>
          <span className="text-[11px] text-muted-foreground flex-shrink-0 font-medium tabular-nums">
            {contact.timestamp}
          </span>
        </div>

        <p className={cn(
          "text-sm truncate mb-2",
          contact.isUnread ? "text-foreground/80 font-medium" : "text-muted-foreground"
        )}>
          {contact.lastMessage}
        </p>

        {/* Tags and Channel */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {visibleTags.map((tag) => (
              <ContactTag key={tag.id} tag={tag} />
            ))}
            {remainingTags > 0 && (
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">
                +{remainingTags}
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground truncate max-w-[70px] font-medium uppercase tracking-wide">
            {contact.channel}
          </span>
        </div>
      </div>

      {/* Hover effect line */}
      <div className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full",
        "bg-primary opacity-0 transition-opacity duration-200",
        "group-hover:opacity-100",
        isSelected && "opacity-100"
      )} />
    </div>
  );
};