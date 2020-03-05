import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => (
  <>
    <h4 className="caption">{comment.name}</h4>
    <p>{comment.body}</p>
    <p className="email">
      commented by:
      {comment.email}
    </p>
  </>
);
