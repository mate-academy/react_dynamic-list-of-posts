import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';

export const Comment = ({ comment, onDeleteComment }) => (
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

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};
