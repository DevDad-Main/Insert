import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Search,
  Send,
  Inbox,
  FileText,
  Archive,
  Trash2,
  Mail,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand: (command: string, args?: any) => void;
}

const commands = [
  {
    group: 'Navigation',
    items: [
      { id: 'goto-inbox', label: 'Go to Inbox', icon: Inbox, shortcut: 'gi' },
      { id: 'goto-sent', label: 'Go to Sent', icon: Send, shortcut: 'gs' },
      { id: 'goto-drafts', label: 'Go to Drafts', icon: FileText, shortcut: 'gd' },
      { id: 'goto-archive', label: 'Go to Archive', icon: Archive, shortcut: 'ga' },
      { id: 'goto-trash', label: 'Go to Trash', icon: Trash2, shortcut: 'gt' },
    ],
  },
  {
    group: 'Actions',
    items: [
      { id: 'compose', label: 'Compose New Email', icon: Mail, shortcut: 'c' },
      { id: 'search', label: 'Search Emails', icon: Search, shortcut: '/' },
      { id: 'reply', label: 'Reply to Email', icon: Send, shortcut: 'r' },
      { id: 'archive', label: 'Archive Email', icon: Archive, shortcut: 'e' },
      { id: 'delete', label: 'Delete Email', icon: Trash2, shortcut: 'd' },
    ],
  },
  {
    group: 'AI Features (Premium)',
    items: [
      { id: 'ai-summarize', label: 'Summarize Thread', icon: Sparkles, premium: true },
      { id: 'ai-suggest', label: 'Suggest Reply', icon: Zap, premium: true },
      { id: 'ai-categorize', label: 'Auto-categorize', icon: Sparkles, premium: true },
    ],
  },
  {
    group: 'Settings',
    items: [
      { id: 'settings', label: 'Open Settings', icon: Settings },
      { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Search, shortcut: '?' },
    ],
  },
];

export const CommandPalette = ({ isOpen, onClose, onCommand }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  const handleSelect = (commandId: string) => {
    onCommand(commandId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-[rgb(15,18,25)] border-[rgb(42,48,60)] terminal-glow">
        <Command className="bg-transparent">
          <div className="border-b border-[rgb(42,48,60)]">
            <CommandInput
              placeholder="Type a command or search..."
              value={search}
              onValueChange={setSearch}
              className="h-14 text-base font-['IBM_Plex_Mono'] text-[rgb(228,228,231)] placeholder:text-[rgb(107,114,128)]"
            />
          </div>
          <CommandList className="max-h-[400px] p-2">
            <CommandEmpty className="py-6 text-center text-sm text-[rgb(107,114,128)]">
              No results found.
            </CommandEmpty>

            {commands.map((group) => (
              <div key={group.group}>
                <CommandGroup
                  heading={group.group}
                  className="text-xs font-['Space_Grotesk'] text-[rgb(107,114,128)] uppercase tracking-wider mb-2"
                >
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.id}
                        onSelect={() => handleSelect(item.id)}
                        className="flex items-center justify-between px-3 py-2.5 cursor-pointer rounded data-[selected=true]:bg-[rgb(20,24,30)] data-[selected=true]:text-[rgb(0,217,255)] transition-colors font-['IBM_Plex_Mono']"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                          {item.premium && (
                            <span className="px-2 py-0.5 bg-[rgb(255,180,84)] text-black text-xs rounded font-['Space_Grotesk'] font-bold">
                              PRO
                            </span>
                          )}
                        </div>
                        {item.shortcut && (
                          <kbd className="px-2 py-1 bg-[rgb(30,34,40)] rounded text-xs text-[rgb(107,114,128)] font-['Space_Grotesk']">
                            {item.shortcut}
                          </kbd>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator className="my-2 bg-[rgb(42,48,60)]" />
              </div>
            ))}

            <div className="px-3 py-2 text-xs text-[rgb(107,114,128)] flex items-center justify-between border-t border-[rgb(42,48,60)] mt-2 pt-3 font-['Space_Grotesk']">
              <span>Navigate with ↑↓</span>
              <span>Select with Enter</span>
              <span>Close with Esc</span>
            </div>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
