import React from 'react';

interface Props {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const CommentItem: React.FC<Props> = ({ id, postId, name, email, body }) => (
  <div className="box" id={`${postId}-${id}`}>
    <strong>{name}</strong>
    {' '}
    <small>{email}</small>
    <p>
      {body}
    </p>
  </div>
);
