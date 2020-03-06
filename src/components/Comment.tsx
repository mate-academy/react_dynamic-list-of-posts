import React, { FC } from 'react';

interface Props {
  comment: CommentInterface;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <>
      <h5 className="comment__name">{name}</h5>
      <p className="comment__body">{body}</p>
      <p className="comment__email">{email}</p>
    </>
  );
};
