import React, { FC } from 'react';

interface Props {
  comments: Comment;
}

export const CommentItem: FC<Props> = ({ comments }) => {
  const { name, body, email } = comments;

  return (
    <div className="post-comments__item">
      <h4 className="post-comments__title">{name}</h4>
      <p className="post-comments__body">{body}</p>
      <p className="post-comments__email">{email}</p>
    </div>
  );
};
