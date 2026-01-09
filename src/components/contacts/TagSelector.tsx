import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tag } from "@/types/contact";
import { ContactTag } from "./ContactTag";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TagSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableTags: Tag[];
  selectedTags: Tag[];
  onToggleTag: (tag: Tag) => void;
}

export const TagSelector = ({
  open,
  onOpenChange,
  availableTags,
  selectedTags,
  onToggleTag,
}: TagSelectorProps) => {
  const isSelected = (tag: Tag) =>
    selectedTags.some((t) => t.id === tag.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Adicionar etiqueta</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          {availableTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onToggleTag(tag)}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                "hover:bg-muted/50",
                isSelected(tag) && "bg-primary/5 border-primary/20"
              )}
            >
              <ContactTag tag={tag} showFull />
              {isSelected(tag) && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
