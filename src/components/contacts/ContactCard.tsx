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
        "flex items-start gap-3 p-3 cursor-pointer transition-colors border-b border-border",
        "hover:bg-contact-hover",
        isSelected && "bg-contact-selected",
        contact.isPinned && "bg-muted/50"
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {/* WhatsApp Icon */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-5 h-5 rounded-full bg-whatsapp flex items-center justify-center">
          <MessageCircle className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Avatar */}
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={contact.avatar} alt={contact.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate">
            {contact.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {contact.isPinned && (
              <Pin className="w-3 h-3 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground">
              {contact.timestamp}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {contact.lastMessage}
        </p>

        {/* Tags and Channel */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 flex-wrap">
            {visibleTags.map((tag) => (
              <ContactTag key={tag.id} tag={tag} />
            ))}
            {remainingTags > 0 && (
              <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted rounded-full">
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
