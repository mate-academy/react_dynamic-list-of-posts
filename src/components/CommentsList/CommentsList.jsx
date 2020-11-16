import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../api/comments';

export const CommentsList = ({ comments, updateComments }) => {
  const handleDelete = async(commentId) => {
    await deleteComment(commentId);
    updateComments();
  };

  return (
    <ul className="PostDetails__list">
      {comments.map(comment => (
        <li className="PostDetails__list-item" key={comment.id}>
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={() => handleDelete(comment.id)}
          >
            X
          </button>
          <p>
            {comment.body}
          </p>
        </li>
      ))}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateComments: PropTypes.func.isRequired,
};
