import { useState } from "react";
import { Contact, Tag } from "@/types/contact";
import { ContactCard } from "./ContactCard";
import { ContactContextMenu } from "./ContactContextMenu";
import { AssignDialog } from "./AssignDialog";
import { TagSelector } from "./TagSelector";
import { toast } from "sonner";

// Sample data
const sampleTags: Tag[] = [
  { id: "1", label: "PRIME", color: "orange" },
  { id: "2", label: "NÃO RESPONDEU", color: "red", emoji: "😡" },
  { id: "3", label: "PLACA 1 AVISO SÃO...", color: "yellow" },
  { id: "4", label: "SEGUNDO AVISO", color: "pink" },
  { id: "5", label: "TERCEIRO AVISO", color: "green", emoji: "😎" },
  { id: "6", label: "URGENTE", color: "red" },
  { id: "7", label: "VIP", color: "blue" },
];

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Sandra Calbar",
    lastMessage: "📋 Etiqueta adicionada no contato...",
    timestamp: "14:27",
    channel: "Televen...",
    tags: [sampleTags[0]],
    avatar: "",
  },
  {
    id: "2",
    name: "Silvana",
    lastMessage: "📋 Etiqueta adicionada no contato...",
    timestamp: "14:28",
    channel: "Televen...",
    tags: [sampleTags[1], sampleTags[2], sampleTags[3], sampleTags[4]],
    avatar: "",
  },
  {
    id: "3",
    name: "Sidney",
    lastMessage: "📋 Etiqueta adicionada no contato...",
    timestamp: "14:28",
    channel: "Televen...",
    tags: [sampleTags[0]],
    avatar: "",
    isPinned: true,
  },
  {
    id: "4",
    name: "Maria Santos",
    lastMessage: "Olá, gostaria de mais informações...",
    timestamp: "13:45",
    channel: "WhatsApp",
    tags: [sampleTags[5], sampleTags[6]],
    avatar: "",
    isUnread: true,
  },
  {
    id: "5",
    name: "João Silva",
    lastMessage: "Obrigado pelo atendimento!",
    timestamp: "12:30",
    channel: "Televen...",
    tags: [],
    avatar: "",
  },
];

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [tagSelectorOpen, setTagSelectorOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  const handleAssign = (contact: Contact) => {
    setActiveContact(contact);
    setAssignDialogOpen(true);
  };

  const confirmAssign = () => {
    if (activeContact) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact.id ? { ...c, assignedTo: "Eu" } : c
        )
      );
      toast.success(`Conversa com ${activeContact.name} atribuída para você!`);
    }
    setAssignDialogOpen(false);
  };

  const handleAddTag = (contact: Contact) => {
    setActiveContact(contact);
    setTagSelectorOpen(true);
  };

  const toggleTag = (tag: Tag) => {
    if (!activeContact) return;

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== activeContact.id) return c;
        const hasTag = c.tags.some((t) => t.id === tag.id);
        return {
          ...c,
          tags: hasTag
            ? c.tags.filter((t) => t.id !== tag.id)
            : [...c.tags, tag],
        };
      })
    );

    setActiveContact((prev) => {
      if (!prev) return prev;
      const hasTag = prev.tags.some((t) => t.id === tag.id);
      return {
        ...prev,
        tags: hasTag
          ? prev.tags.filter((t) => t.id !== tag.id)
          : [...prev.tags, tag],
      };
    });
  };

  const handleMarkUnread = (contact: Contact) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contact.id ? { ...c, isUnread: !c.isUnread } : c
      )
    );
    toast.success(
      contact.isUnread
        ? "Conversa marcada como lida"
        : "Conversa marcada como não lida"
    );
  };

  const handleBlock = (contact: Contact) => {
    toast.success(`Contato ${contact.name} bloqueado`);
  };

  const handleFinish = (contact: Contact) => {
    toast.success(`Conversa com ${contact.name} finalizada`);
  };

  const handleMarkWaiting = (contact: Contact) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contact.id ? { ...c, isWaiting: !c.isWaiting } : c
      )
    );
    toast.success(
      contact.isWaiting
        ? "Conversa desmarcada como esperando"
        : "Conversa marcada como esperando"
    );
  };

  const handlePin = (contact: Contact) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contact.id ? { ...c, isPinned: !c.isPinned } : c
      )
    );
    toast.success(
      contact.isPinned ? "Conversa desafixada" : "Conversa fixada"
    );
  };

  // Sort: pinned first
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="h-full bg-white overflow-hidden flex flex-col">
      {sortedContacts.map((contact, index) => (
        <ContactContextMenu
          key={contact.id}
          onAssign={() => handleAssign(contact)}
          onAddTag={() => handleAddTag(contact)}
          onMarkUnread={() => handleMarkUnread(contact)}
          onBlock={() => handleBlock(contact)}
          onFinish={() => handleFinish(contact)}
          onMarkWaiting={() => handleMarkWaiting(contact)}
          onPin={() => handlePin(contact)}
          isPinned={contact.isPinned}
        >
          <div>
            <ContactCard
              contact={contact}
              isSelected={selectedContactId === contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              isLast={index === sortedContacts.length - 1}
            />
          </div>
        </ContactContextMenu>
      ))}

      <AssignDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        contactName={activeContact?.name || ""}
        onConfirm={confirmAssign}
      />

      <TagSelector
        open={tagSelectorOpen}
        onOpenChange={setTagSelectorOpen}
        availableTags={sampleTags}
        selectedTags={activeContact?.tags || []}
        onToggleTag={toggleTag}
      />
    </div>
  );
};