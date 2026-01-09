export interface Tag {
  id: string;
  label: string;
  color: 'orange' | 'yellow' | 'green' | 'red' | 'pink' | 'blue';
  emoji?: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  channel: string;
  tags: Tag[];
  isUnread?: boolean;
  isPinned?: boolean;
  isWaiting?: boolean;
  assignedTo?: string;
}
