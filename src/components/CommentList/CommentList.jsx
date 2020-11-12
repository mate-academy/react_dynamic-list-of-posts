import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../api/coments';

export const CommentList = ({ comments, updateComments }) => {
  const removeComment = (commentId) => {
    deleteComment(commentId)
      .then(() => updateComments());
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
