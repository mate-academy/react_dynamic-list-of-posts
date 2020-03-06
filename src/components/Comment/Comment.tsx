import React, { FC } from 'react';

import './Comment.css';

interface Props{
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <>
      <h3>{name}</h3>
      <p>{body}</p>
      <p>{email}</p>
    </>
  );
};
