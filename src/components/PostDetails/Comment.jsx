import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment, deleteComment }) => (
  <>
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => deleteComment(comment.id)}
    >
      X
    </button>
    <h4>{comment.name}</h4>
    <p>{comment.body}</p>
  </>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};
