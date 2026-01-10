import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, X, Paperclip, Image, Smile } from 'lucide-react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
  replyTo?: {
    to: string;
    subject: string;
  };
}

export const ComposeModal = ({ isOpen, onClose, onSend, replyTo }: ComposeModalProps) => {
  const [to, setTo] = useState(replyTo?.to || '');
  const [subject, setSubject] = useState(replyTo?.subject || '');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (to && subject && body) {
      onSend({ to, subject, body });
      setTo('');
      setSubject('');
      setBody('');
      onClose();
    }
  };

  const handleClose = () => {
    // Save draft logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl h-[600px] p-0 gap-0 bg-card border-border flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-['JetBrains_Mono'] font-bold text-foreground">
              {replyTo ? 'Reply' : 'New Message'}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 dark:text-green-400 font-['Space_Grotesk'] px-2 py-1 bg-green-100/20 dark:bg-green-900/20 rounded">
                -- INSERT --
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Form Fields */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-4 space-y-3 border-b border-border">
            <div className="flex items-center gap-3">
              <label className="text-sm font-['Space_Grotesk'] text-muted-foreground w-16">
                To:
              </label>
              <Input
                value={to}
                onChange={(e) => setTo(e.target.value)}
placeholder="recipient@example.com"
                 className="flex-1 bg-muted border-border text-foreground font-['IBM_Plex_Mono'] focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-['Space_Grotesk'] text-muted-foreground w-16">
                Subject:
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
placeholder="Email subject"
                 className="flex-1 bg-muted border-border text-foreground font-['IBM_Plex_Mono'] focus:border-primary"
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message... (Markdown supported)"
              className="w-full h-full min-h-[300px] bg-transparent border-none text-foreground font-['IBM_Plex_Mono'] resize-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-shrink-0 bg-muted/50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[rgb(107,114,128)] hover:text-[rgb(0,217,255)] hover:bg-[rgb(20,24,30)]"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Attach
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-muted"
            >
              <Image className="w-4 h-4 mr-2" />
              Image
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[rgb(107,114,128)] hover:text-[rgb(0,217,255)] hover:bg-[rgb(20,24,30)]"
            >
              <Smile className="w-4 h-4 mr-2" />
              Emoji
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-['Space_Grotesk']">
              Press <kbd className="px-2 py-1 bg-muted rounded text-primary">Esc</kbd> to close
            </span>
            <Button
              onClick={handleSend}
              disabled={!to || !subject || !body}
              className="bg-primary text-primary-foreground hover:bg-primary/80 font-['Space_Grotesk'] font-semibold disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
