import React from 'react';
import PropTypes from 'prop-types';

import { removePostComment } from '../../api/comments';

export const Comment = function({ comment, reloadComments }) {
  const removeButtonHandler = function() {
    removePostComment(comment.id).then(() => {
      reloadComments();
    });
  };

  return (
    <>
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={removeButtonHandler}
      >
        X
      </button>
      <p>{comment.body}</p>
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  reloadComments: PropTypes.func.isRequired,
};
