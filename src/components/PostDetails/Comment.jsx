import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment, onDelete }) => (
  <li key={comment.id} className="PostDetails__list-item">
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => onDelete(comment.id)}
    >
      X
    </button>
    <p>{comment.body}</p>
  </li>
);

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
