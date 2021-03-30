import React from 'react';
import PropTypes from 'prop-types';
import { removeComment, getComments } from '../../api/api';

export function Comments({ comment, selectedPost, editComment }) {
  const handleDeleteComment = async() => {
    await removeComment(comment.id);
    await getComments(selectedPost)
      .then(editComment);
  };

  return (
    <>
      <li className="PostDetails__list-item">
        <button
          type="button"
          className="PostDetails__remove-button button"
          onClick={handleDeleteComment}
        >
          X
        </button>
        <p>{comment.body}</p>
      </li>
    </>
  );
}

Comments.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  editComment: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
