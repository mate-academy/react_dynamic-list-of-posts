import React, { useCallback } from 'react';
import { CommentProps } from '../../props/CommentProps';

export const Comment = ({ body, id, removeComment }) => (
  <>
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={useCallback(
        () => {
          removeComment(id);
        },
        [id, removeComment],
      )}
    >
      X
    </button>
    <p>{body}</p>
  </>
);

Comment.propTypes = CommentProps;
