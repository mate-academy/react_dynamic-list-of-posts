import React from 'react';
import PropTypes from 'prop-types';

export const Comments = (
  {
    commentId,
    commentBody,
    deleteComment,
    commentErrorId,
  },
) => (
  <>
    <li
      className="PostDetails__list-item"
      // key={commentId}
    >
      <button
        className="button"
        type="button"
        onClick={() => deleteComment(commentId)}
      >
        X
      </button>
      <p>{commentBody}</p>
    </li>

    {commentErrorId === commentId
      && (
        <p className="errorText">Error, please, try again later.</p>
      )}
  </>
);

Comments.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentBody: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  commentErrorId: PropTypes.number.isRequired,
};
