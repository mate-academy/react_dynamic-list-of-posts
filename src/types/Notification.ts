export type Notification = {
  type: 'error' | 'warning' | 'info';
  message: string;
} | null;
