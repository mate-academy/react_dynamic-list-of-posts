import React, { FC } from 'react';
import './Comments.css';
import { Comment } from '../Comment/Comment';

interface Props {
  comments: Comments;
}

export const Comments: FC<Props> = ({ comments }) => (
  <div className="comments">
    <h2 className="comments__title">Comments:</h2>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);
