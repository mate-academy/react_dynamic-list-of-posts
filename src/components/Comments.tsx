import React from 'react';
import { Comment } from './Comment';

interface Props {
  comments: Comments;
}

export const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div className="comments">
      <p>Comments:</p>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
