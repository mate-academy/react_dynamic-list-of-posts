import React from 'react';
import Comment from './Comment';

type CommentListProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <div className="comments">
    <h3>Comments</h3>
    {comments.map(comment => (
      <Comment {...comment} key={comment.id} />
    ))}
  </div>
);

export default CommentList;
