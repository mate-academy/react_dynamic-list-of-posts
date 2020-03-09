import React, { FC } from 'react';
import { Comment } from './Comment/Comment';

interface Props {
  comments: Comment[];
}

export const CommentsList: FC<Props> = ({
  comments,
}) => {
  return (
    <ul className="comments">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </ul>
  );
};
