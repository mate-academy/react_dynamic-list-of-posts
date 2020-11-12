import React from 'react';
import PropTypes from 'prop-types';

export function Comment({ commentId, commentBody, removeComment }) {
  return (
    <li className="PostDetails__list-item" key={commentId}>
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => removeComment(commentId)}
      >
        X
      </button>
      <p>{commentBody}</p>
    </li>
  );
}

Comment.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentBody: PropTypes.number.isRequired,
  removeComment: PropTypes.number.isRequired,
};
