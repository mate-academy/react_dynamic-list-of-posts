import React from 'react';
import Comment from "./Comment";

function CommentList(props) {
  let commentList = props.comments.filter(comment => {
    return comment.postId === props.postId;
  });

  let postComments = commentList.map(comment => {
    return <Comment key={comment.id} authorEmail={comment.email} authorName={comment.name} comment={comment.body}/>
  });
  return (
    <>
      {postComments}
    </>
  )
}

export default CommentList;
