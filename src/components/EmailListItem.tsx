import { Email } from '@/types/email';
import { cn } from '@/lib/utils';
import { Star, Paperclip, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  isVisualSelected?: boolean;
  onClick: () => void;
}

export const EmailListItem = ({
  email,
  isSelected,
  isVisualSelected,
  onClick,
}: EmailListItemProps) => {
  const formattedTime = formatDistanceToNow(email.timestamp, { addSuffix: true });

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all relative',
        'hover:bg-accent hover:text-accent-foreground',
        isSelected && 'bg-muted text-foreground',
        isVisualSelected && 'bg-purple-900/20 dark:bg-purple-900/30',
        !email.isRead && 'font-medium'
      )}
    >
      {isSelected && (
        <div className="absolute inset-0 dark:bg-white/20 bg-black/10 z-[-1] rounded-lg" />
      )}

      <div className="flex flex-col w-full gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {email.from.name}
            </div>
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              isSelected
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {formattedTime}
          </div>
        </div>
        <div className="text-xs font-medium">{email.subject}</div>
        <div className="text-xs line-clamp-2 text-muted-foreground">
          {email.preview}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mt-1">
          {email.labels && email.labels.length > 0 && (
            <div className="flex gap-1">
              {email.labels.slice(0, 2).map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px]"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          {email.hasAttachments && (
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Paperclip className="w-3 h-3" />
            </span>
          )}
          {email.threadCount && email.threadCount > 1 && (
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <MessageSquare className="w-3 h-3" />
              <span>{email.threadCount}</span>
            </span>
          )}
          {email.isStarred && (
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          )}
        </div>
      </div>
    </button>
  );
};