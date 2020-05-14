import React from 'react';
import { Comment } from '../Comment/Comment';

type Props = {
  comments: CommentType[];
};

export const CommentList = (props: Props) => {
  const { comments } = props;

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};
