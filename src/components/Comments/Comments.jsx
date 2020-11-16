import React from 'react';

export const Comments = ({ comments, handleDelete }) => (
  comments.map(comment => (
    <li key={comment.id} className="PostDetails__list-item">
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => handleDelete(comment.id)}
      >
        X
      </button>
      <p>{comment.body}</p>
    </li>
  )));
