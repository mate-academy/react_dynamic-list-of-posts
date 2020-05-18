import React from 'react';

interface Props {
  comment: Comment;
}

export const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <p>{comment.body}</p>
  );
};
