import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment, remove }) => (
  <li className="PostDetails__list-item">
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => remove(comment.id)}
    >
      Delete
    </button>
    <p>{comment.body}</p>
  </li>
);

Comment.propTypes = {
  remove: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
