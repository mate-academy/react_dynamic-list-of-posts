import React from 'react';

type Props = {
  name: string;
  email: string;
  body: string;
};

export const CommentComponent: React.FC<Props> = ({ name, email, body }) => (
  <div className="comments">
    <p className="comments__title">Comments:</p>
    <p>{name}</p>
    <p className="comments__text">{body}</p>
    <span>{email}</span>
  </div>
);
