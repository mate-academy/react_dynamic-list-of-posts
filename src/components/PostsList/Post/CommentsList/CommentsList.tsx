import React, { FC } from 'react';
import { Comment } from './Comment/Comment';

interface Props {
  comments: Comments;
}

export const CommentsList: FC<Props> = ({
  comments,
}) => {
  return (
    <div className="comments">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};
