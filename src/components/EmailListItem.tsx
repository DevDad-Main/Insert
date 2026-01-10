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
    <div
      onClick={onClick}
      className={cn(
        'relative px-4 py-3 border-b border-border cursor-pointer transition-all group',
        'hover:bg-muted',
        isSelected && 'bg-muted border-l-2 border-l-primary scale-[1.01]',
        isVisualSelected && 'bg-purple-900/20 border-l-2 border-l-purple-500',
        !email.isRead && 'bg-accent/20'
      )}
    >
      {/* Selection indicator for Vim visual mode */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
      )}

      <div className="flex items-start gap-3">
        {/* Star indicator */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle star toggle
          }}
          className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-amber-500"
        >
          <Star
            className={cn(
              'w-4 h-4',
              email.isStarred
                ? 'fill-amber-500 text-amber-500'
                : 'text-muted-foreground hover:text-amber-500'
            )}
          />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-sm font-["Space_Grotesk"] truncate',
                    !email.isRead
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground'
                  )}
                >
                  {email.from.name}
                </span>
                {!email.isRead && (
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
              <h3
                className={cn(
                  'text-sm truncate mt-0.5',
                  !email.isRead
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {email.subject}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {formattedTime.replace('about ', '')}
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {email.preview}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs">
            {email.labels && email.labels.length > 0 && (
              <div className="flex gap-1">
                {email.labels.slice(0, 2).map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-muted text-primary rounded font-['Space_Grotesk']"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            {email.hasAttachments && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Paperclip className="w-3 h-3" />
              </span>
            )}
            {email.threadCount && email.threadCount > 1 && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="w-3 h-3" />
                <span>{email.threadCount}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
