import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment';
import { removeComment } from '../../api/comments';

export const PostComments = ({ comments, updateComments }) => {
  const handleClick = async(commentId) => {
    await removeComment(commentId);
    updateComments();
  };

  return (
    <ul className="PostDetails__list">
      {comments.map(comment => (
        <li
          key={comment.id}
          className="PostDetails__list-item"
        >
          <Comment
            {...comment}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
};

PostComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateComments: PropTypes.func.isRequired,
};
