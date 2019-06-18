import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
  const {comments, postId} = props;
  const postComments = comments.filter(comment => comment.postId === postId);
  const commentsMap = postComments.map((comment) => {
    return (
      <Comment name={comment.name} email={comment.email} body={comment.body} key={comment.id} />
    );
  });
  return (
    <>
      {commentsMap}
    </>
  )
}
