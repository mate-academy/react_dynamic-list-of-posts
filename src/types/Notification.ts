export enum NotificationType {
  'danger',
  'warning',
}

export interface Notification {
  typeNotification: NotificationType;
  text: string;
  dataCypress?: string;
}
