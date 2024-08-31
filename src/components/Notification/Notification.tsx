import { NotificationType } from '../../enums';
import classNames from 'classnames';

type Props = {
  type: NotificationType;
  text: string;
};

export const Notification = ({ type, text, ...rest }: Props) => {
  return (
    <div
      className={classNames('notification', {
        'is-danger': type === NotificationType.Error,
        'is-warning': type === NotificationType.Warning,
      })}
      {...rest}
    >
      {text}
    </div>
  );
};
