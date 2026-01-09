import { Contact } from "@/types/contact";
import { ContactTag } from "./ContactTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageCircle, Pin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContactCardProps {
  contact: Contact;
  isSelected?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isLast?: boolean;
}

export const ContactCard = ({
  contact,
  isSelected,
  onClick,
  onContextMenu,
  isLast,
}: ContactCardProps) => {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const visibleTags = contact.tags.slice(0, 2);
  const hiddenTags = contact.tags.slice(2);

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 cursor-pointer",
        "transition-colors duration-150",
        "hover:bg-slate-50",
        !isLast && "border-b border-slate-100",
        isSelected && "bg-blue-50/70",
        contact.isPinned && "bg-amber-50/40"
      )}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {/* Avatar with platform badge */}
      <div className="relative flex-shrink-0">
        <Avatar className="w-11 h-11">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-slate-200 text-slate-600 font-medium text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#25D366] flex items-center justify-center border-2 border-white">
          <MessageCircle className="w-2.5 h-2.5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate text-[15px]">
              {contact.name}
            </h3>
            {contact.isPinned && (
              <Pin className="w-3 h-3 text-amber-500 flex-shrink-0 fill-amber-400" />
            )}
          </div>
          <span className="text-[11px] text-slate-400 flex-shrink-0 font-medium">
            {contact.timestamp}
          </span>
        </div>

        <p className={cn(
          "text-[13px] truncate mb-1.5",
          contact.isUnread ? "text-slate-700 font-medium" : "text-slate-500"
        )}>
          {contact.lastMessage}
        </p>

        {/* Tags and Channel */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {visibleTags.map((tag) => (
              <ContactTag key={tag.id} tag={tag} />
            ))}
            {hiddenTags.length > 0 && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium cursor-default hover:bg-slate-200 transition-colors">
                      +{hiddenTags.length}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="bg-white border border-slate-200 shadow-lg p-2 z-50"
                  >
                    <div className="flex flex-col gap-1">
                      {hiddenTags.map((tag) => (
                        <ContactTag key={tag.id} tag={tag} showFull />
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <span className="text-[10px] text-slate-400 truncate max-w-[70px] uppercase tracking-wide">
            {contact.channel}
          </span>
        </div>
      </div>

      {/* Unread indicator */}
      {contact.isUnread && (
        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
      )}
    </div>
  );
};