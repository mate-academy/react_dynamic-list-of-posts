import React from 'react';

import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    <h3>Comments:</h3>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </div>
)

export default CommentList;