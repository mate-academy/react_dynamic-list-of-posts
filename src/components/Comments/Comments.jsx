import React from 'react';

export const Comments = ({ comments, deleteComment }) => (
  comments.map(comment => (
    <li key={comment.id} className="PostDetails__list-item">
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => deleteComment(comment.id)}
      >
        X
      </button>
      <p>{comment.body}</p>
    </li>
  )));
