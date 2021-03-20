import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../api/comments';

export function Comment({ comment, onRefreshComment }) {
  const onDeleteComment = () => {
    deleteComment(comment.id);
    onRefreshComment();
  };

  return (
    <li
      className="PostDetails__list-item"
    >
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={onDeleteComment}
      >
        X
      </button>
      <p>{comment.body}</p>
    </li>
  );
}

Comment.propTypes = {
  onRefreshComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
