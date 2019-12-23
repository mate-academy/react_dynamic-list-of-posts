import React from 'react';
import Comment from './Comment';
import { Comment } from './interfaces';

interface Props {
  comments: Comment[];
}

const CommentList: React.FC<Props> = ({ comments }) => (
  <div className="post__comments comments">
    <h2 className="comments__title">Comments:</h2>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

export default CommentList;
