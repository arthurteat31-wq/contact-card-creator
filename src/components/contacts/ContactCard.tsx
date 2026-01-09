import { Contact } from "@/types/contact";
import { ContactTag } from "./ContactTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

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
        "flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150",
        "hover:bg-muted/60",
        isSelected && "bg-primary/5"
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {/* WhatsApp Icon */}
      <div className="flex-shrink-0">
        <div className="w-5 h-5 rounded-full bg-whatsapp flex items-center justify-center">
          <MessageCircle className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Avatar */}
      <Avatar className="w-11 h-11 flex-shrink-0">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback className="bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <h3 className="font-medium text-foreground truncate text-[15px]">
            {contact.name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {contact.timestamp}
          </span>
        </div>

        <p className="text-sm text-muted-foreground truncate">
          {contact.lastMessage}
        </p>

        {/* Tags and Channel */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            {visibleTags.map((tag) => (
              <ContactTag key={tag.id} tag={tag} />
            ))}
            {remainingTags > 0 && (
              <span className="text-xs text-muted-foreground font-medium">
                +{remainingTags}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground truncate max-w-[80px]">
            {contact.channel}
          </span>
        </div>
      </div>
    </div>
  );
};
