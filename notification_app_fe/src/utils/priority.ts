import type { Notification } from '../types';

const PRIORITY_SCORES: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getPriorityNotifications = (notifications: Notification[]): Notification[] => {
  return [...notifications]
    .sort((a, b) => {
      // 1. Unread first
      if (a.read !== b.read) {
        return a.read ? 1 : -1;
      }

      // 2. Higher priority first
      const scoreA = PRIORITY_SCORES[a.type] || 0;
      const scoreB = PRIORITY_SCORES[b.type] || 0;
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      // 3. Newest timestamp first
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
    .slice(0, 10);
};
