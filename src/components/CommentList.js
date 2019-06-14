import React from 'react';
import Comment from "./Comment";

function CommentList(props) {
  return (
    <div>
      {props.comments.map(comment =>
        <Comment
          key={comment.name}
          name={comment.name}
          commentEmail={comment.email}
          commentText={comment.body}
        />)}
    </div>
  );
}

export default CommentList;
