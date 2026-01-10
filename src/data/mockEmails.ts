import { Email } from '@/types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'GitHub',
      email: 'notifications@github.com',
    },
    subject: '[repo/project] New pull request #142: Feature/vim-navigation',
    preview: 'A new pull request has been opened by @developer. This PR adds comprehensive Vim-style keyboard navigation to the email client...',
    body: `# Pull Request #142

A new pull request has been opened by @developer.

## Changes
- Implemented j/k navigation
- Added gg/G jump commands
- Integrated command palette

## Files Changed
- src/components/EmailList.tsx
- src/hooks/useKeyboardNav.ts

Review the changes at: https://github.com/repo/project/pull/142`,
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    isRead: false,
    isStarred: true,
    hasAttachments: false,
    folder: 'inbox',
    labels: ['work', 'development'],
    threadId: 't1',
    threadCount: 3,
  },
  {
    id: '2',
    from: {
      name: 'Linear',
      email: 'notifications@linear.app',
    },
    subject: 'Issue ENG-1337 assigned to you: Implement command palette search',
    preview: 'Priority: High | Status: In Progress. You have been assigned a new issue. The command palette needs fuzzy search capabilities...',
    body: `Issue ENG-1337 has been assigned to you.

**Title:** Implement command palette search
**Priority:** High
**Status:** In Progress

## Description
The command palette needs fuzzy search capabilities for quick navigation across emails, contacts, and folders.

## Acceptance Criteria
- Fuzzy matching algorithm
- Recent commands history
- Contextual action suggestions`,
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    isRead: false,
    isStarred: false,
    hasAttachments: true,
    folder: 'inbox',
    labels: ['work', 'urgent'],
  },
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
    },
    subject: 'Re: Q4 Engineering Roadmap Review',
    preview: 'Thanks for the detailed breakdown! I have a few thoughts on the terminal UI project. The Vim-inspired navigation...',
    body: `Hi team,

Thanks for the detailed breakdown! I have a few thoughts on the terminal UI project.

The Vim-inspired navigation is exactly what power users need. I'd suggest we also consider:

1. Customizable keybindings for advanced users
2. Export/import of configuration
3. Telemetry for most-used commands

Let's sync tomorrow at 2pm to discuss implementation details.

Best,
Sarah`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: true,
    isStarred: true,
    hasAttachments: false,
    folder: 'inbox',
    threadId: 't2',
    threadCount: 7,
  },
  {
    id: '4',
    from: {
      name: 'Stripe',
      email: 'billing@stripe.com',
    },
    subject: 'Your monthly invoice for December 2024',
    preview: 'Your subscription payment of $49.00 has been processed successfully. View invoice #INV-2024-12-001...',
    body: `Invoice Summary

Subscription: Pro Plan
Amount: $49.00
Status: Paid
Date: December 1, 2024

Payment method: •••• 4242
Next billing date: January 1, 2025

View full invoice: https://stripe.com/invoice/inv_123`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    folder: 'inbox',
    labels: ['billing', 'receipts'],
  },
  {
    id: '5',
    from: {
      name: 'Marcus Rodriguez',
      email: 'marcus@startup.io',
    },
    subject: 'Collaborative Filtering Algorithm - Code Review Needed',
    preview: 'Hey! I just pushed the new collaborative filtering implementation. Would love your eyes on the algorithm...',
    body: `Hey!

I just pushed the new collaborative filtering implementation. Would love your eyes on the algorithm before we deploy to production.

Key changes:
\`\`\`python
def calculate_similarity(user_a, user_b):
    # Cosine similarity implementation
    return np.dot(user_a, user_b) / (norm(user_a) * norm(user_b))
\`\`\`

The performance tests look good - 50ms p99 on production-scale data.

Branch: feature/collaborative-filtering
Tests: All passing ✓

Thanks!
Marcus`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: false,
    isStarred: false,
    hasAttachments: false,
    folder: 'inbox',
    labels: ['work', 'code-review'],
  },
  {
    id: '6',
    from: {
      name: 'Figma',
      email: 'updates@figma.com',
    },
    subject: 'You were mentioned in "Email Client - Terminal UI"',
    preview: '@you Nice work on the status bar! The mode indicators are super clean. Should we add more visual feedback for...',
    body: `@you Nice work on the status bar!

The mode indicators are super clean. Should we add more visual feedback for keyboard shortcuts when hovering over interactive elements?

Also thinking we could add a subtle glow effect on focused items to reinforce the terminal aesthetic.

Thoughts?

View in Figma: https://figma.com/file/abc123`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    folder: 'inbox',
    labels: ['design'],
  },
  {
    id: '7',
    from: {
      name: 'Vercel',
      email: 'deploy@vercel.com',
    },
    subject: '✓ Deployment successful: email-client-vim (Production)',
    preview: 'Your deployment has completed successfully. Visit https://email-client-vim.vercel.app to see your changes live...',
    body: `Deployment Summary

✓ Build completed in 2m 34s
✓ Deployed to Production
✓ All checks passed

Environment: Production
Commit: 7a8b9c0
Branch: main
URL: https://email-client-vim.vercel.app

Lighthouse Score:
- Performance: 98
- Accessibility: 100
- Best Practices: 100
- SEO: 100`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    isRead: true,
    isStarred: true,
    hasAttachments: false,
    folder: 'inbox',
    labels: ['deployment'],
  },
  {
    id: '8',
    from: {
      name: 'Hacker News Digest',
      email: 'digest@hackernews.com',
    },
    subject: 'Top 10 stories this week',
    preview: '1. Show HN: Terminal-based email client with Vim keybindings (github.com) - 847 points...',
    body: `Your weekly Hacker News digest

1. Show HN: Terminal-based email client with Vim keybindings
   847 points | 234 comments
   
2. Neovim 0.10.0 released with new features
   623 points | 156 comments
   
3. The beauty of terminal user interfaces
   445 points | 89 comments

Read more at https://news.ycombinator.com`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    folder: 'inbox',
    labels: ['newsletter'],
  },
];
