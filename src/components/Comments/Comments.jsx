import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../api/comments';

export const Comments = React.memo(({ comments, loadPostComments }) => {
  const removeComment = (commentId) => {
    deleteComment(commentId).then(() => loadPostComments());
  };

  return (
    <ul className="PostDetails__list">
      {comments.map(comment => (
        <li
          key={comment.id}
          className="PostDetails__list-item"
        >
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={() => removeComment(comment.id)}
          >
            X
          </button>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
});

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
  })).isRequired,
  loadPostComments: PropTypes.func.isRequired,
};
