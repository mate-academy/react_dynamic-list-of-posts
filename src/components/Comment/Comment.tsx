import React, { FC } from 'react';

interface Props {
  comment: CommentType;
}

export const Comment: FC<Props> = ({ comment }) => (
  <>
    <h3 className="title comment-title">{comment.name}</h3>
    <p className="comment-email">{comment.email}</p>
    <p>{comment.body}</p>
  </>
);
