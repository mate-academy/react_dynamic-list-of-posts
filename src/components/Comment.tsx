import React, { FC } from 'react';

interface Props {
  name: string;
  email: string;
  body: string;
}

export const Comment: FC<Props> = ({ name, email, body }) => {
  return (
    <>
      <h5 className="comment__name">{name}</h5>
      <p className="comment__body">{body}</p>
      <p className="comment__email">{email}</p>
    </>
  );
};
