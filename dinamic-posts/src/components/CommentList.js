import React from 'react';
import Comment from './Comment';

function CommentList(props) {
  const { postComments } = props;
  const postCommentsDiv = postComments.map(comment => <Comment {...comment} key={comment.id} />);
  return (
    <div>{postCommentsDiv}</div>
  );
}

export default CommentList;
