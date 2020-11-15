import React from 'react';
import PropTypes from 'prop-types';
import { removeComment } from '../../api/comments';

export const Comments = ({ id, body, updateComments }) => {
  const removeOnClick = async(commentId) => {
    await removeComment(commentId);
    updateComments();
  };

  return (
    <li className="PostDetails__list-item" key={id}>
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => removeOnClick(id)}
      >
        X
      </button>
      <p>{body}</p>
    </li>
  );
};

Comments.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  updateComments: PropTypes.func.isRequired,
};
