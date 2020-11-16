import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const PostComment = memo(({ comment, handleDelete }) => (
  <li className="PostDetails__list-item">
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => handleDelete(comment.id)}
    >
      X
    </button>
    <p>{comment.body}</p>
  </li>
));

PostComment.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;
