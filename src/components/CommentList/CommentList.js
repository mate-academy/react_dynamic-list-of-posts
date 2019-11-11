import React from 'react';
import Comment from '../Comment/Comment';

function CommentList({comments}) {
  return (
    <div className="comments">
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />))}
    </div>
  );
}

export default CommentList;
