import classNames from 'classnames';

type TProps = {
  isStyle: 'is-danger' | 'is-warning';
  message: string;
  cypressData?: string;
};

export const Notification: React.FC<TProps> = ({
  isStyle,
  message,
  cypressData = null,
}) => {
  return (
    <>
      <div
        className={classNames(
          'notification', {
            [isStyle]: isStyle,
          },
        )}
        data-cy={cypressData}
      >
        {message}
      </div>
    </>
  );
};
