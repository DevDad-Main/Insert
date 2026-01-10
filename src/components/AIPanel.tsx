import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Sparkles, X, MessageSquare, Inbox, File, Archive, Trash2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIAssistant } from './AIAssistant';
import { Email } from '@/types/email';

interface AIPanelProps {
  selectedEmail: Email | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentFolder: string;
  onFolderChange: (folder: string) => void;
  unreadCounts: Record<string, number>;
}

const folders = [
  { id: 'inbox', icon: Inbox, label: 'Inbox' },
  { id: 'drafts', icon: File, label: 'Drafts' },
  { id: 'sent', icon: Send, label: 'Sent' },
  { id: 'archive', icon: Archive, label: 'Archive' },
  { id: 'trash', icon: Trash2, label: 'Trash' },
];

export const AIPanel = ({
  selectedEmail,
  isCollapsed,
  onToggleCollapse,
  currentFolder,
  onFolderChange,
  unreadCounts
}: AIPanelProps) => {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Account Switcher - Top */}
      <div className="flex h-[52px] items-center justify-center px-2">
        {isCollapsed ? (
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">U</span>
          </div>
        ) : (
          <div className="flex w-full flex-1 items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-foreground">U</span>
            </div>
            <span className="text-sm font-medium text-foreground">user@insert.app</span>
          </div>
        )}
      </div>
      <Separator />

      {/* Folder Navigation - Middle */}
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 flex-1"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {folders.map((folder) => {
            const Icon = folder.icon;
            const isActive = currentFolder === folder.id;
            const unreadCount = unreadCounts[folder.id] || 0;

            if (isCollapsed) {
              return (
                <Tooltip key={folder.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <span
                      onClick={() => onFolderChange(folder.id)}
                      className={cn(
                        buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                        "h-9 w-9 cursor-pointer"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="sr-only">{folder.label}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {folder.label}
                    {unreadCount > 0 && (
                      <span className="ml-auto text-muted-foreground">
                        {unreadCount}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <span
                key={folder.id}
                onClick={() => onFolderChange(folder.id)}
                className={cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                  "justify-start cursor-pointer"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {folder.label}
                {unreadCount > 0 && (
                  <span
                    className={cn(
                      "ml-auto",
                      isActive && "text-background"
                    )}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* AI Assistant - Bottom */}
      <div className="flex flex-col">
        <Separator />
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="m-2 h-9 w-9"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="sr-only">AI Assistant</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">AI Assistant</TooltipContent>
          </Tooltip>
        ) : (
          <>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  AI Assistant
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 max-h-[50vh]">
              <div className="p-4">
                {selectedEmail ? (
                  <AIAssistant
                    emailBody={selectedEmail.body}
                    emailSubject={selectedEmail.subject}
                  />
                ) : (
                  <Card className="bg-muted/50 border-border p-4">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Select an email to use AI features</p>
                    </div>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};