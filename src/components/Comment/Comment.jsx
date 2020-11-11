import React from 'react';
import { CommentProps } from '../../props/CommentProps';

export const Comment = ({ body, id, removeComment }) => (
  <>
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => {
        removeComment(id);
      }}
    >
      X
    </button>
    <p>{body}</p>
  </>
);

Comment.propTypes = CommentProps;
