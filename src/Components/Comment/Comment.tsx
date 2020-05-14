import React from 'react';

interface Props {
  comment: CommentType;
}

export const Comment: React.FC<Props> = ({ comment }) => (
  <div>
    <h3>
      {comment.name}
    </h3>
    <p>
      {comment.body}
    </p>
    <p>
      {comment.email}
    </p>
  </div>
);
