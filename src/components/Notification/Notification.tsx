import React from 'react';

type Props = {
  content: string;
  dataCy: string;
  classType: string;
};

export const Notification: React.FC<Props> = ({
  content,
  dataCy,
  classType,
}) => {
  return (
    <div className={`notification ${classType}`} data-cy={dataCy}>
      {content}
    </div>
  );
};
