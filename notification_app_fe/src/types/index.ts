export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  type: 'Event' | 'Result' | 'Placement';
  read: boolean;
}

export interface LogPayload {
  stack: string;
  level: string;
  package: string;
  message: string;
}

export type NotificationType = 'Event' | 'Result' | 'Placement' | 'All';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
