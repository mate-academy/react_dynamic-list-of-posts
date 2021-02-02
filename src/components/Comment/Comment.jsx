import React, { useState, useEffect } from 'react';
import './Comment.scss';

export const Comment = ({ comment, onDeleteComment }) => {
  const [commentItem, setCommentItem] = useState(comment);
  console.log(commentItem);

  useEffect(() => {
    return () => setCommentItem(comment);
  }, [comment.id]);

  return (
    <>
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => {
          onDeleteComment(comment.id);
        }}
      >
        X
      </button>
      <p>{comment.body}</p>

    </>
  );
};
