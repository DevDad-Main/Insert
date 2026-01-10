export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';
  labels?: string[];
  threadId?: string;
  threadCount?: number;
}

export type VimMode = 'NORMAL' | 'INSERT' | 'VISUAL';

export interface EmailState {
  emails: Email[];
  selectedEmailId: string | null;
  selectedEmailIds: string[];
  currentFolder: string;
  mode: VimMode;
  searchQuery: string;
  unreadCount: number;
}
