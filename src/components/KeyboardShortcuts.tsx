import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    category: "Navigation",
    items: [
      { keys: ["j"], description: "Move down" },
      { keys: ["k"], description: "Move up" },
      { keys: ["g", "g"], description: "Jump to top" },
      { keys: ["G"], description: "Jump to bottom" },
      { keys: ["Enter"], description: "Open selected email" },
      { keys: ["Esc"], description: "Close/Go back" },
    ],
  },
  {
    category: "Actions",
    items: [
      { keys: ["c"], description: "Compose new email" },
      { keys: ["r"], description: "Reply to email" },
      { keys: ["d"], description: "Delete email" },
      { keys: ["e"], description: "Archive email" },
      { keys: ["s"], description: "Star/Unstar email" },
      { keys: ["a"], description: "Toggle AI assistant" },
      { keys: ["/"], description: "Search" },
    ],
  },
  {
    category: "Modes",
    items: [
      { keys: ["v"], description: "Enter Visual mode (multi-select)" },
      { keys: ["i"], description: "Enter Insert mode (compose)" },
      { keys: ["Esc"], description: "Return to Normal mode" },
    ],
  },
  {
    category: "Global",
    items: [
      { keys: ["Ctrl", "K"], description: "Open command palette" },
      { keys: ["?"], description: "Show keyboard shortcuts" },
    ],
  },
  {
    category: "Go To (Command Palette)",
    items: [
      { keys: ["g", "i"], description: "Go to Inbox" },
      { keys: ["g", "s"], description: "Go to Sent" },
      { keys: ["g", "d"], description: "Go to Drafts" },
      { keys: ["g", "a"], description: "Go to Archive" },
      { keys: ["g", "t"], description: "Go to Trash" },
    ],
  },
];

export const KeyboardShortcuts = ({
  isOpen,
  onClose,
}: KeyboardShortcutsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] p-0 gap-0 bg-[rgb(15,18,25)] border-[rgb(42,48,60)]">
        <DialogHeader className="px-6 py-4 border-b border-[rgb(42,48,60)]">
          <DialogTitle className="text-xl font-['JetBrains_Mono'] font-bold text-[rgb(228,228,231)]">
            Keyboard Shortcuts
          </DialogTitle>
          <p className="text-sm text-[rgb(107,114,128)] mt-2 font-['IBM_Plex_Mono']">
            Navigate your email like a Vim pro
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(80vh-120px)]">
          <div className="p-6 space-y-8">
            {shortcuts.map((category) => (
              <div key={category.category}>
                <h3 className="text-sm font-['Space_Grotesk'] font-semibold text-[rgb(0,217,255)] uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-[rgb(20,24,30)] transition-colors"
                    >
                      <span className="text-sm text-[rgb(228,228,231)] font-['IBM_Plex_Mono']">
                        {item.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.keys.map((key, keyIndex) => (
                          <kbd
                            key={keyIndex}
                            className="px-3 py-1.5 bg-[rgb(30,34,40)] border border-[rgb(42,48,60)] rounded text-[rgb(0,217,255)] font-['Space_Grotesk'] font-semibold text-sm min-w-[2.5rem] text-center"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-[rgb(42,48,60)] bg-[rgb(10,14,20)]">
          <p className="text-xs text-[rgb(107,114,128)] text-center font-['Space_Grotesk']">
            Press{" "}
            <kbd className="px-2 py-1 bg-[rgb(20,24,30)] rounded text-[rgb(0,217,255)]">
              Esc
            </kbd>{" "}
            or{" "}
            <kbd className="px-2 py-1 bg-[rgb(20,24,30)] rounded text-[rgb(0,217,255)]">
              ?
            </kbd>{" "}
            to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
