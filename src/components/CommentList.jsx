import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
  function getComments() {
    const comments = props.comments.filter(item =>
      item.postId === props.postId).map(item =>
        <Comment key={item.id} comment={item} />);
    return comments;
  }

  return (
    <div className="comment-list">
      {getComments()}
    </div>
  );
}
