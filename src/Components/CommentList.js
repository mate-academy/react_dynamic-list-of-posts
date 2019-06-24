import React from 'react';
import Comment from './Comment.js';

function CommentList(props) {
  return (
    <ol>Comments:
      {props.comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
    </ol>
  );
}

export default CommentList;
