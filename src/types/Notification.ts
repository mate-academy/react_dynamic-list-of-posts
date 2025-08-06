/* eslint-disable @typescript-eslint/indent */
export type NotificationSource = 'Userloading' | 'PostDetails' | 'Comment';

export interface Notification {
  error: string;
  alarm: string;
  source: NotificationSource;
}

export type ErrorActions =
  | {
      type: 'SET_ERROR';
      error: string;
      alarm: string;
      source: NotificationSource;
    }
  | {
      type: 'SET_ALARM';
      error: string;
      alarm: string;
      source: NotificationSource;
    }
  | { type: 'SET_CLEAR'; source: NotificationSource };
