import { Inbox, Send, FileText, Archive, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FolderSidebarProps {
  currentFolder: string;
  onFolderChange: (folder: string) => void;
  unreadCounts: Record<string, number>;
}

const folders = [
  { id: 'inbox', icon: Inbox, label: 'Inbox' },
  { id: 'sent', icon: Send, label: 'Sent' },
  { id: 'drafts', icon: FileText, label: 'Drafts' },
  { id: 'archive', icon: Archive, label: 'Archive' },
  { id: 'trash', icon: Trash2, label: 'Trash' },
];

export const FolderSidebar = ({
  currentFolder,
  onFolderChange,
  unreadCounts,
}: FolderSidebarProps) => {
  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-4">
      {folders.map((folder) => {
        const Icon = folder.icon;
        const isActive = currentFolder === folder.id;
        const unreadCount = unreadCounts[folder.id] || 0;

        return (
          <button
            key={folder.id}
            onClick={() => onFolderChange(folder.id)}
            className={cn(
              'relative w-12 h-12 flex items-center justify-center rounded-md transition-all group',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary hover:bg-muted'
            )}
            title={folder.label}
          >
            <Icon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            <span className="absolute left-full ml-3 px-2 py-1 bg-muted text-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity font-['Space_Grotesk']">
              {folder.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
