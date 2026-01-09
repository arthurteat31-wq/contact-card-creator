import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  UserPlus,
  Tag,
  Mail,
  Ban,
  CheckCircle,
  Clock,
  Pin,
} from "lucide-react";

interface ContactContextMenuProps {
  children: React.ReactNode;
  onAssign?: () => void;
  onAddTag?: () => void;
  onMarkUnread?: () => void;
  onBlock?: () => void;
  onFinish?: () => void;
  onMarkWaiting?: () => void;
  onPin?: () => void;
  isPinned?: boolean;
}

export const ContactContextMenu = ({
  children,
  onAssign,
  onAddTag,
  onMarkUnread,
  onBlock,
  onFinish,
  onMarkWaiting,
  onPin,
  isPinned,
}: ContactContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem
          onClick={onAssign}
          className="flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-muted-foreground" />
          <span>Atribuir para mim</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onAddTag}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Tag className="w-4 h-4 text-muted-foreground" />
          <span>Adicionar etiqueta</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onMarkUnread}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>Marcar como não lida</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onBlock}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Ban className="w-4 h-4 text-muted-foreground" />
          <span>Bloquear contato</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onFinish}
          className="flex items-center gap-2 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-muted-foreground" />
          <span>Finalizar conversa</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onMarkWaiting}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>Marcar como esperando</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={onPin}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Pin className="w-4 h-4 text-muted-foreground" />
          <span>{isPinned ? "Desafixar conversa" : "Fixar conversa"}</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
