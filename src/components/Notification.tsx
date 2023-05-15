import classNames from 'classnames';
import React from 'react';

type Props = {
  isImportant: boolean,
  title?: string,
  dataCy: string,
};

export const Notification: React.FC<Props> = ({
  isImportant,
  title = 'Something went wrong',
  dataCy,
}) => {
  return (
    <div
      className={classNames('notification',
        { 'is-danger': isImportant, 'is-warning': !isImportant })}
      data-cy={dataCy}
    >
      {title}
    </div>
  );
};
