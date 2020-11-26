import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({
  commentId,
  commentBody,
  removeComment,
  commentErrorId,
}) => (
  <>
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

    {commentErrorId === commentId
      && (
        <p className="errorText">
          Something goes wrong, cannot delete comment. Try again later.
        </p>
      )}
  </>
);

Comment.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentBody: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
  commentErrorId: PropTypes.number.isRequired,
};
