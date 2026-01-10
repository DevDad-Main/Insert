import { Email, VimMode } from '@/types/email';
import { EmailListItem } from './EmailListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  selectedEmailIds: string[];
  mode: VimMode;
  currentFolder: string;
  onEmailSelect: (emailId: string) => void;
}

export const EmailList = ({
  emails,
  selectedEmailId,
  selectedEmailIds,
  mode,
  currentFolder,
  onEmailSelect,
}: EmailListProps) => {
  const filteredEmails = emails.filter((email) => email.folder === currentFolder);
  const selectedEmailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedEmailId && selectedEmailRef.current) {
      selectedEmailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedEmailId]);

  return (
    <div className="w-[400px] flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-['JetBrains_Mono'] font-bold text-foreground capitalize">
            {currentFolder}
          </h2>
          <span className="text-xs text-muted-foreground font-['Space_Grotesk']">
            {filteredEmails.length} messages
          </span>
        </div>

        {/* Search hint */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded border border-border text-muted-foreground text-sm">
          <Search className="w-4 h-4" />
          <span className="text-xs text-muted-foreground">Press / to search</span>
        </div>
      </div>

      {/* Email List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <p className="text-muted-foreground text-sm mb-2">
                No emails in {currentFolder}
              </p>
                <p className="text-xs text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded">c</kbd>
                to compose a new message
              </p>
            </div>
          ) : (
            filteredEmails.map((email) => (
              <div
                key={email.id}
                ref={selectedEmailId === email.id ? selectedEmailRef : null}
              >
                <EmailListItem
                  email={email}
                  isSelected={selectedEmailId === email.id}
                  isVisualSelected={mode === 'VISUAL' && selectedEmailIds.includes(email.id)}
                  onClick={() => onEmailSelect(email.id)}
                />
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Quick stats footer */}
      <div className="p-3 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {mode === 'VISUAL'
              ? `${selectedEmailIds.length} selected`
              : 'j/k to navigate'}
          </span>
          <span className="font-['Space_Grotesk'] text-foreground">
            Enter to open
          </span>
        </div>
      </div>
    </div>
  );
};
