import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { deleteComment, getPostComments } from '../../api/comments';

export function Comment({ comment, onUpdateComments, selectedPostId }) {
  const onDeleteComment = useCallback(async() => {
    await deleteComment(comment.id);
    await getPostComments(selectedPostId)
      .then(onUpdateComments);
  }, []);

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
  onUpdateComments: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
