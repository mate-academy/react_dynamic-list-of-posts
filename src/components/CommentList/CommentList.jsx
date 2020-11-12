import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader';

import { deleteComment } from '../../api/coments';

export const CommentList = ({ comments, updateComments }) => {
  const [deletingCommentId, setDeletingComment] = useState(0);

  const removeComment = async(commentId) => {
    setDeletingComment(commentId);
    await deleteComment(commentId);
    await updateComments();
    setDeletingComment(0);
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
            {deletingCommentId === comment.id
              ? <Loader />
              : 'X'
            }
          </button>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateComments: PropTypes.func.isRequired,
};
