interface Notification {
  key: string;
  message: string;
  options?: any;
  dismissed?: boolean;
}

export default Notification;
