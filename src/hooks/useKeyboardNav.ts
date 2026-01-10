import { useEffect, useCallback } from 'react';
import { VimMode } from '@/types/email';

interface KeyboardNavOptions {
  mode: VimMode;
  onNavigateUp: () => void;
  onNavigateDown: () => void;
  onJumpToTop: () => void;
  onJumpToBottom: () => void;
  onSelect: () => void;
  onDelete: () => void;
  onReply: () => void;
  onCompose: () => void;
  onToggleStar: () => void;
  onArchive: () => void;
  onSearch: () => void;
  onOpenCommandPalette: () => void;
  onEnterVisualMode: () => void;
  onEscape: () => void;
  onShowHelp: () => void;
  onToggleAI?: () => void;
  enabled?: boolean;
}

export const useKeyboardNav = ({
  mode,
  onNavigateUp,
  onNavigateDown,
  onJumpToTop,
  onJumpToBottom,
  onSelect,
  onDelete,
  onReply,
  onCompose,
  onToggleStar,
  onArchive,
  onSearch,
  onOpenCommandPalette,
  onEnterVisualMode,
  onEscape,
  onShowHelp,
  onToggleAI,
  enabled = true,
}: KeyboardNavOptions) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Command Palette (works in all modes)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenCommandPalette();
        return;
      }

      // Help (works in all modes)
      if (e.key === '?' && mode === 'NORMAL') {
        e.preventDefault();
        onShowHelp();
        return;
      }

      // Escape (works in all modes)
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape();
        return;
      }

      // NORMAL mode keybindings
      if (mode === 'NORMAL') {
        switch (e.key) {
          case 'j':
            e.preventDefault();
            onNavigateDown();
            break;
          case 'k':
            e.preventDefault();
            onNavigateUp();
            break;
          case 'g':
            if (e.shiftKey) {
              // G - jump to bottom
              e.preventDefault();
              onJumpToBottom();
            } else {
              // gg - jump to top (handled by double-tap detection)
              e.preventDefault();
              onJumpToTop();
            }
            break;
          case 'Enter':
            e.preventDefault();
            onSelect();
            break;
          case 'd':
            e.preventDefault();
            onDelete();
            break;
          case 'r':
            e.preventDefault();
            onReply();
            break;
          case 'c':
            e.preventDefault();
            onCompose();
            break;
          case 's':
            e.preventDefault();
            onToggleStar();
            break;
          case 'e':
            e.preventDefault();
            onArchive();
            break;
          case '/':
            e.preventDefault();
            onSearch();
            break;
          case 'v':
            e.preventDefault();
            onEnterVisualMode();
            break;
          case 'a':
            e.preventDefault();
            if (onToggleAI) onToggleAI();
            break;
        }
      }

      // VISUAL mode keybindings
      if (mode === 'VISUAL') {
        switch (e.key) {
          case 'j':
            e.preventDefault();
            onNavigateDown();
            break;
          case 'k':
            e.preventDefault();
            onNavigateUp();
            break;
          case 'd':
            e.preventDefault();
            onDelete();
            break;
          case 'e':
            e.preventDefault();
            onArchive();
            break;
        }
      }
    },
    [
      mode,
      enabled,
      onNavigateUp,
      onNavigateDown,
      onJumpToTop,
      onJumpToBottom,
      onSelect,
      onDelete,
      onReply,
      onCompose,
      onToggleStar,
      onArchive,
      onSearch,
      onOpenCommandPalette,
      onEnterVisualMode,
      onEscape,
      onShowHelp,
      onToggleAI,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
