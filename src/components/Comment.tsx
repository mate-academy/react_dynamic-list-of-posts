import React, { FC } from 'react';

interface Props {
  name: string;
  body: string;
  email: string;
}

export const Comment: FC<Props> = ({ name, body, email }) => (
  <div className="comment">
    <h4>{name}</h4>
    <p>{body}</p>
    <p className="comment__email">{email}</p>
  </div>
);
