import { VimMode } from '@/types/email';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface VimStatusBarProps {
  mode: VimMode;
  unreadCount: number;
  syncStatus: 'synced' | 'syncing' | 'error';
  keybindHint?: string;
}

export const VimStatusBar = ({
  mode,
  unreadCount,
  syncStatus,
  keybindHint = 'Press ? for help',
}: VimStatusBarProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const getModeColor = () => {
    switch (mode) {
      case 'INSERT':
        return 'bg-green-500 text-black';
      case 'VISUAL':
        return 'bg-purple-500 text-black';
      case 'NORMAL':
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return '⟳';
      case 'error':
        return '⚠';
      case 'synced':
      default:
        return '✓';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-card border-t border-border flex items-center justify-between px-4 z-40 font-['Space_Grotesk'] text-sm">
      {/* Left: Mode Indicator */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'px-3 py-1 font-bold tracking-wider',
            getModeColor()
          )}
        >
          -- {mode} --
        </div>
        {mode === 'VISUAL' && (
          <span className="text-purple-400 text-xs">
            Visual selection active
          </span>
        )}
      </div>

      {/* Center: Keybind Hints */}
      <div className="text-muted-foreground text-xs flex items-center gap-4">
        <span className="hidden md:inline">{keybindHint}</span>
        <span className="hidden lg:inline">Ctrl+K: Command Palette</span>
      </div>

      {/* Right: Stats */}
      <div className="flex items-center gap-4 text-xs">
        <span className="text-amber-500 flex items-center gap-1">
          <span className="font-bold">{unreadCount}</span>
          <span className="text-muted-foreground">unread</span>
        </span>
        <span
          className={cn(
            'flex items-center gap-1',
            syncStatus === 'error'
              ? 'text-red-400'
              : syncStatus === 'syncing'
              ? 'text-primary'
              : 'text-green-400'
          )}
        >
          <span>{getSyncIcon()}</span>
          <span className="text-muted-foreground">
            {syncStatus === 'syncing' ? 'syncing' : 'synced'}
          </span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <button className="text-primary hover:text-primary/80 transition-colors font-['Space_Grotesk'] font-medium">
          Upgrade
        </button>
      </div>
    </div>
  );
};
