import { useState, useCallback } from "react";
import { Email, VimMode } from "@/types/email";
import { mockEmails } from "@/data/mockEmails";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { VimStatusBar } from "./VimStatusBar";
import { EmailList } from "./EmailList";
import { ReadingPane } from "./ReadingPane";
import { AIPanel } from "./AIPanel";
import { CommandPalette } from "./CommandPalette";
import { ComposeModal } from "./ComposeModal";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const EmailClient = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [mode, setMode] = useState<VimMode>("NORMAL");
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [isAICollapsed, setIsAICollapsed] = useState(false);
  const [replyTo, setReplyTo] = useState<
    { to: string; subject: string } | undefined
  >();

  const filteredEmails = emails.filter(
    (email) => email.folder === currentFolder,
  );
  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || null;
  const unreadCount = emails.filter(
    (e) => !e.isRead && e.folder === "inbox",
  ).length;

  const getCurrentEmailIndex = () => {
    if (!selectedEmailId) return -1;
    return filteredEmails.findIndex((e) => e.id === selectedEmailId);
  };

  const handleNavigateDown = useCallback(() => {
    const currentIndex = getCurrentEmailIndex();
    if (currentIndex < filteredEmails.length - 1) {
      const nextEmail = filteredEmails[currentIndex + 1];
      setSelectedEmailId(nextEmail.id);

      if (mode === "VISUAL") {
        setSelectedEmailIds((prev) =>
          prev.includes(nextEmail.id) ? prev : [...prev, nextEmail.id],
        );
      }
    }
  }, [filteredEmails, mode, getCurrentEmailIndex]);

  const handleNavigateUp = useCallback(() => {
    const currentIndex = getCurrentEmailIndex();
    if (currentIndex > 0) {
      const prevEmail = filteredEmails[currentIndex - 1];
      setSelectedEmailId(prevEmail.id);

      if (mode === "VISUAL") {
        setSelectedEmailIds((prev) =>
          prev.includes(prevEmail.id) ? prev : [...prev, prevEmail.id],
        );
      }
    }
  }, [filteredEmails, mode, getCurrentEmailIndex]);

  const handleJumpToTop = useCallback(() => {
    if (filteredEmails.length > 0) {
      setSelectedEmailId(filteredEmails[0].id);
    }
  }, [filteredEmails]);

  const handleJumpToBottom = useCallback(() => {
    if (filteredEmails.length > 0) {
      setSelectedEmailId(filteredEmails[filteredEmails.length - 1].id);
    }
  }, [filteredEmails]);

  const handleSelect = useCallback(() => {
    if (selectedEmailId) {
      // Mark as read
      setEmails((prev) =>
        prev.map((e) =>
          e.id === selectedEmailId ? { ...e, isRead: true } : e,
        ),
      );
    }
  }, [selectedEmailId]);

  const handleDelete = useCallback(() => {
    if (mode === "VISUAL" && selectedEmailIds.length > 0) {
      setEmails((prev) =>
        prev.map((e) =>
          selectedEmailIds.includes(e.id) ? { ...e, folder: "trash" } : e,
        ),
      );
      toast.success(`${selectedEmailIds.length} emails moved to trash`);
      setSelectedEmailIds([]);
      setMode("NORMAL");
    } else if (selectedEmailId) {
      setEmails((prev) =>
        prev.map((e) =>
          e.id === selectedEmailId ? { ...e, folder: "trash" } : e,
        ),
      );
      toast.success("Email moved to trash");
    }
  }, [selectedEmailId, selectedEmailIds, mode]);

  const handleArchive = useCallback(() => {
    if (mode === "VISUAL" && selectedEmailIds.length > 0) {
      setEmails((prev) =>
        prev.map((e) =>
          selectedEmailIds.includes(e.id) ? { ...e, folder: "archive" } : e,
        ),
      );
      toast.success(`${selectedEmailIds.length} emails archived`);
      setSelectedEmailIds([]);
      setMode("NORMAL");
    } else if (selectedEmailId) {
      setEmails((prev) =>
        prev.map((e) =>
          e.id === selectedEmailId ? { ...e, folder: "archive" } : e,
        ),
      );
      toast.success("Email archived");
    }
  }, [selectedEmailId, selectedEmailIds, mode]);

  const handleToggleStar = useCallback(() => {
    if (selectedEmailId) {
      setEmails((prev) =>
        prev.map((e) =>
          e.id === selectedEmailId ? { ...e, isStarred: !e.isStarred } : e,
        ),
      );
    }
  }, [selectedEmailId]);

  const handleReply = useCallback(() => {
    if (selectedEmail) {
      setReplyTo({
        to: selectedEmail.from.email,
        subject: `Re: ${selectedEmail.subject}`,
      });
      setShowCompose(true);
      setMode("INSERT");
    }
  }, [selectedEmail]);

  const handleCompose = useCallback(() => {
    setReplyTo(undefined);
    setShowCompose(true);
    setMode("INSERT");
  }, []);

  const handleEnterVisualMode = useCallback(() => {
    setMode("VISUAL");
    if (selectedEmailId) {
      setSelectedEmailIds([selectedEmailId]);
    }
  }, [selectedEmailId]);

  const handleEscape = useCallback(() => {
    if (mode === "VISUAL") {
      setMode("NORMAL");
      setSelectedEmailIds([]);
    } else if (mode === "INSERT") {
      setMode("NORMAL");
      setShowCompose(false);
    } else if (showCommandPalette) {
      setShowCommandPalette(false);
    } else if (showShortcuts) {
      setShowShortcuts(false);
    } else if (selectedEmailId) {
      setSelectedEmailId(null);
    }
  }, [mode, showCommandPalette, showShortcuts, selectedEmailId]);

  const handleCommand = useCallback(
    (commandId: string) => {
      switch (commandId) {
        case "goto-inbox":
          setCurrentFolder("inbox");
          break;
        case "goto-sent":
          setCurrentFolder("sent");
          break;
        case "goto-drafts":
          setCurrentFolder("drafts");
          break;
        case "goto-archive":
          setCurrentFolder("archive");
          break;
        case "goto-trash":
          setCurrentFolder("trash");
          break;
        case "compose":
          handleCompose();
          break;
        case "reply":
          handleReply();
          break;
        case "archive":
          handleArchive();
          break;
        case "delete":
          handleDelete();
          break;
        case "search":
          toast.info("Search feature coming soon");
          break;
        case "ai-summarize":
        case "ai-suggest":
        case "ai-categorize":
          toast.info("Upgrade to Premium for AI features");
          break;
        case "shortcuts":
          setShowShortcuts(true);
          break;
      }
    },
    [handleCompose, handleReply, handleArchive, handleDelete],
  );

  const handleSendEmail = useCallback(
    (email: { to: string; subject: string; body: string }) => {
      // In a real app, this would send the email
      toast.success("Email sent successfully!");
      setMode("NORMAL");
    },
    [],
  );

  useKeyboardNav({
    mode,
    onNavigateUp: handleNavigateUp,
    onNavigateDown: handleNavigateDown,
    onJumpToTop: handleJumpToTop,
    onJumpToBottom: handleJumpToBottom,
    onSelect: handleSelect,
    onDelete: handleDelete,
    onReply: handleReply,
    onCompose: handleCompose,
    onToggleStar: handleToggleStar,
    onArchive: handleArchive,
    onSearch: () => toast.info("Search feature coming soon"),
    onOpenCommandPalette: () => setShowCommandPalette(true),
    onEnterVisualMode: handleEnterVisualMode,
    onEscape: handleEscape,
    onShowHelp: () => setShowShortcuts(true),
    onToggleAI: () => setIsAICollapsed(!isAICollapsed),
    enabled: !showCompose && !showCommandPalette && !showShortcuts,
  });

  const unreadCounts = {
    inbox: emails.filter((e) => !e.isRead && e.folder === "inbox").length,
    sent: 0,
    drafts: emails.filter((e) => e.folder === "drafts").length,
    archive: 0,
    trash: 0,
  };

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Main Layout */}
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:insert=${JSON.stringify(sizes)}`;
        }}
        className="flex-1"
      >
        {/* AI Panel */}
        <ResizablePanel
          defaultSize={20}
          collapsedSize={50}
          collapsible={true}
          minSize={15}
          maxSize={40}
          onCollapse={() => {
            setIsAICollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onResize={() => {
            setIsAICollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
        >
          <AIPanel
            selectedEmail={selectedEmail}
            isCollapsed={isAICollapsed}
            onToggleCollapse={() => setIsAICollapsed(!isAICollapsed)}
            currentFolder={currentFolder}
            onFolderChange={setCurrentFolder}
            unreadCounts={unreadCounts}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Email List Panel */}
        <ResizablePanel defaultSize={35} minSize={25}>
          <EmailList
            emails={filteredEmails}
            selectedEmailId={selectedEmailId}
            selectedEmailIds={selectedEmailIds}
            mode={mode}
            currentFolder={currentFolder}
            onEmailSelect={(id) => {
              setSelectedEmailId(id);
              handleSelect();
            }}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Reading Pane */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <ReadingPane
            email={selectedEmail}
            onReply={handleReply}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onToggleStar={handleToggleStar}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status Bar */}
      <VimStatusBar
        mode={mode}
        unreadCount={unreadCount}
        syncStatus="synced"
        keybindHint={
          mode === "NORMAL"
            ? "j/k: navigate • Enter: open • c: compose • a: toggle AI panel"
            : mode === "VISUAL"
              ? "d: delete • e: archive • Esc: exit visual"
              : "Esc: exit insert mode"
        }
      />

      {/* Modals */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onCommand={handleCommand}
      />

      <ComposeModal
        isOpen={showCompose}
        onClose={() => {
          setShowCompose(false);
          setMode("NORMAL");
        }}
        onSend={handleSendEmail}
        replyTo={replyTo}
      />

      <KeyboardShortcuts
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
};
