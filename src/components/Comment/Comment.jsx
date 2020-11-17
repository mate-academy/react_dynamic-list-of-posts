import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment, handleDelete }) => (
  <li className="PostDetails__list-item" key={comment.id}>
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => handleDelete(comment.id)}
    >
      X
    </button>
    <p>
      {comment.body}
    </p>
  </li>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
