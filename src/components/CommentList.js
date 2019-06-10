import React from 'react';
import './CommentList.css'
import Comment from './Comment'

function CommentList(props) {
  return (
    <div className="comments">
      {props.comments.map(comment => Comment(comment))}
    </div>
  );
}

export default CommentList;
