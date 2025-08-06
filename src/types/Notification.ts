export interface Notification {
  error: string;
  alarm: string;
  source: string;
}

export type ErrorActions =
  | { type: 'SET_ERROR'; error: string; alarm: string; source: string }
  | { type: 'SET_ALARM'; error: string; alarm: string; source: string }
  | { type: 'SET_CLEAR'; source: string };
