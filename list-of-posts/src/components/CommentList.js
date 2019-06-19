import React from 'react';
import Comment from "./Comment";

function CommentList(props) {
  const commentList = props.comments.filter(comment => comment.postId === props.postId);

  const postComments = commentList.map(comment => {
    return <Comment key={comment.id} authorEmail={comment.email} authorName={comment.name} comment={comment.body}/>
  });
  return (
    <>
      {postComments}
    </>
  )
}

export default CommentList;
