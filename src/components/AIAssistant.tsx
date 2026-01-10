import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAssistantProps {
  emailBody: string;
  emailSubject: string;
  onClose?: () => void;
}

type AIFeature = 'summarize' | 'suggest-reply' | 'categorize';

export const AIAssistant = ({ emailBody, emailSubject, onClose }: AIAssistantProps) => {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isPremium] = useState(false); // In real app, this would come from user context

  const handleAIAction = async (feature: AIFeature) => {
    if (!isPremium) {
      // Show upgrade prompt
      alert('This AI feature requires a Premium subscription. Click "Upgrade" in the status bar to unlock AI capabilities!');
      return;
    }

    setSelectedFeature(feature);
    setIsLoading(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI responses
    let mockResult = '';
    switch (feature) {
      case 'summarize':
        mockResult = `📝 **Email Summary:**\n\nThis email discusses ${emailSubject.toLowerCase()}. The sender is requesting feedback and proposes a meeting next week to discuss the implementation details. Key points include timeline adjustments and resource allocation.`;
        break;
      case 'suggest-reply':
        mockResult = `✍️ **Suggested Reply:**\n\nThank you for reaching out regarding ${emailSubject}. I've reviewed the details and agree with the proposed approach. I'm available for a meeting next week - Tuesday or Wednesday afternoon works best for me. Let me know what time suits you.\n\nBest regards`;
        break;
      case 'categorize':
        mockResult = `🏷️ **Suggested Categories:**\n\n• Work - Project Management\n• Action Required - Response Needed\n• Priority - Medium\n• Follow-up - Meeting Scheduling`;
        break;
    }

    setResult(mockResult);
    setIsLoading(false);
  };

  return (
    <Card className="bg-card border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-['Space_Grotesk'] font-semibold text-foreground">
            AI Assistant {!isPremium && <span className="text-amber-500 text-xs ml-2">Premium</span>}
          </h3>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAIAction('summarize')}
          disabled={isLoading}
          className={cn(
            "text-xs font-['Space_Grotesk'] border-border hover:bg-muted hover:text-primary",
            selectedFeature === 'summarize' && 'bg-muted text-primary'
          )}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Summarize
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAIAction('suggest-reply')}
          disabled={isLoading}
          className={cn(
            "text-xs font-['Space_Grotesk'] border-border hover:bg-muted hover:text-primary",
            selectedFeature === 'suggest-reply' && 'bg-muted text-primary'
          )}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Suggest Reply
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAIAction('categorize')}
          disabled={isLoading}
          className={cn(
            "text-xs font-['Space_Grotesk'] border-border hover:bg-muted hover:text-primary",
            selectedFeature === 'categorize' && 'bg-muted text-primary'
          )}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          Categorize
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>AI is analyzing the email...</span>
        </div>
      )}

      {result && !isLoading && (
        <div className="bg-muted rounded p-3 text-sm">
          <div className="text-foreground whitespace-pre-wrap font-['IBM_Plex_Mono']">
            {result}
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-primary hover:text-primary/80"
            >
              Copy
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setResult(null)}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {!isPremium && !isLoading && !result && (
        <div className="text-xs text-muted-foreground">
          💡 Unlock AI features with Premium: Email summaries, smart reply suggestions, and auto-categorization
        </div>
      )}
    </Card>
  );
};
