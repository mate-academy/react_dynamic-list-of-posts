import { NotificationMessage } from '../types/NotificationMessage';

interface UserNotificationProps {
  message: NotificationMessage;
}

export const UserNotification: React.FC<UserNotificationProps> = ({
  message,
}) => {
  const { text, type, cyData } = message;

  return (
    <div className={`notification ${type}`} data-cy={cyData}>
      {text}
    </div>
  );
};
