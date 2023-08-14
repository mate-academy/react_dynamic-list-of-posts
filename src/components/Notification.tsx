import { FC } from 'react';
import classNames from 'classnames';
import { NotificationType } from '../types/NotificationType';
import { useGlobalContext } from '../hooks';

type Props = {
  type: NotificationType;
} & (
  {
    type: NotificationType.PostsWarning;
    warningText: string
  } | {
    type: Exclude<NotificationType, NotificationType.PostsWarning>;
    warningText?: string;
  }
);

export const Notification: FC<Props> = ({ type, warningText }) => {
  const { error } = useGlobalContext();

  return (
    <div
      className={classNames('notification', {
        'is-danger': error,
        'is-warning': !error,
      })}
      data-cy={type}
    >
      {error ? (
        'Something went wrong!'
      ) : (
        warningText
      )}
    </div>
  );
};
