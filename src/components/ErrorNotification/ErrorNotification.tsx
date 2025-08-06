import classNames from 'classnames';

type Props = {
  message: string;
  type?: 'danger' | 'warning';
  dataCy?: string;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  type = 'danger',
  dataCy,
}) => {
  return (
    <div
      className={classNames('notification', {
        'is-danger': type === 'danger',
        'is-warning': type === 'warning',
      })}
      data-cy={dataCy}
    >
      {message}
    </div>
  );
};
