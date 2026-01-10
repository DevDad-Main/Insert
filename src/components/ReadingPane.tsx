import { Email } from '@/types/email';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Reply,
  ReplyAll,
  Forward,
  Archive,
  Trash2,
  Star,
  MoreVertical,
  Paperclip,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AIAssistant } from './AIAssistant';

interface ReadingPaneProps {
  email: Email | null;
  onReply: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onToggleStar: () => void;
  showAI?: boolean;
  onToggleAI?: () => void;
}

export const ReadingPane = ({
  email,
  onReply,
  onArchive,
  onDelete,
  onToggleStar,
  showAI = true,
  onToggleAI,
}: ReadingPaneProps) => {
  
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card scan-lines">
        <div className="text-center">
          <div className="text-6xl mb-4 text-muted-foreground">📧</div>
          <h3 className="text-lg font-['JetBrains_Mono'] text-foreground mb-2">
            No email selected
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Select an email from the list or press{' '}
            <kbd className="px-2 py-1 bg-muted rounded text-primary">
              c
            </kbd>{' '}
            to compose a new message
          </p>
          <div className="mt-6 text-xs text-muted-foreground space-y-1">
            <p>
              <kbd className="px-2 py-1 bg-muted rounded mr-2 text-primary">j/k</kbd>
              Navigate
            </p>
            <p>
              <kbd className="px-2 py-1 bg-muted rounded mr-2 text-primary">Enter</kbd>
              Open email
            </p>
            <p>
              <kbd className="px-2 py-1 bg-muted rounded mr-2 text-primary">Ctrl+K</kbd>
              Command palette
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-card">
      {/* Email Header */}
      <div className="border-b border-border bg-muted/50 backdrop-blur-md">
        {/* Action Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onReply}
              className="text-[rgb(107,114,128)] hover:text-[rgb(0,217,255)] hover:bg-[rgb(20,24,30)] font-['Space_Grotesk']"
            >
              <Reply className="w-4 h-4 mr-2" />
              Reply
              <kbd className="ml-2 px-1.5 py-0.5 bg-muted rounded text-xs text-primary">r</kbd>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-[rgb(107,114,128)] hover:text-[rgb(0,217,255)] hover:bg-[rgb(20,24,30)] font-['Space_Grotesk']"
            >
              <ReplyAll className="w-4 h-4 mr-2" />
              Reply All
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-muted font-['Space_Grotesk']"
            >
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleStar}
              className="text-muted-foreground hover:text-amber-500 hover:bg-muted"
            >
              <Star
                className={cn(
                  'w-4 h-4',
                  email.isStarred && 'fill-amber-500 text-amber-500'
                )}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onArchive}
              className="text-[rgb(107,114,128)] hover:text-[rgb(0,217,255)] hover:bg-[rgb(20,24,30)]"
            >
              <Archive className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="text-muted-foreground hover:text-red-500 hover:bg-muted"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-muted"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Email Meta */}
        <div className="px-6 py-4">
          <h1 className="text-xl font-['JetBrains_Mono'] font-bold text-foreground mb-3">
            {email.subject}
          </h1>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-['Space_Grotesk']">
                {email.from.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-['Space_Grotesk'] font-semibold text-foreground">
                    {email.from.name}
                  </span>
                  {email.labels && email.labels.length > 0 && (
                    <div className="flex gap-1">
                      {email.labels.map((label) => (
                        <span
                          key={label}
                          className="px-2 py-0.5 bg-muted text-primary rounded text-xs font-['Space_Grotesk']"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {email.from.email}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>{format(email.timestamp, 'MMM d, yyyy')}</div>
              <div>{format(email.timestamp, 'h:mm a')}</div>
            </div>
          </div>

          {email.hasAttachments && (
            <div className="mt-3 flex items-center gap-2 text-xs text-[rgb(107,114,128)]">
              <Paperclip className="w-4 h-4" />
              <span>2 attachments</span>
            </div>
          )}
        </div>
      </div>

      {/* Email Body */}
      <ScrollArea className="flex-1 scan-lines">
        <div className="px-6 py-6 max-w-4xl space-y-6">
          {/* AI Assistant */}
          {showAI && (
            <AIAssistant
              emailBody={email.body}
              emailSubject={email.subject}
              onClose={onToggleAI}
            />
          )}

          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap font-['IBM_Plex_Mono']">
              {email.body}
            </div>
          </div>

          {/* Thread history (if exists) */}
          {email.threadCount && email.threadCount > 1 && (
            <div className="mt-8 pt-6 border-t border-border">
              <button className="text-sm text-primary hover:text-primary/80 font-['Space_Grotesk'] flex items-center gap-2">
                <span>View {email.threadCount - 1} previous messages</span>
                <span className="text-xs">▼</span>
              </button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Reply Hint */}
      <div className="px-6 py-3 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Press <kbd className="px-2 py-1 bg-muted rounded text-primary">r</kbd>{' '}
            to reply
          </span>
          <span>
            Press <kbd className="px-2 py-1 bg-muted rounded text-primary">Esc</kbd>{' '}
            to close
          </span>
        </div>
      </div>
    </div>
  );
};
