import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.css';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    { comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))
    }
  </div>
);

export default CommentList;
