import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../api/comments';
import { Comment } from '../Comment/Comment';

export const CommentsList = ({ comments, updateComments }) => {
  const handleDelete = (commentId) => {
    deleteComment(commentId)
      .then(updateComments);
  };

  return (
    <ul className="PostDetails__list">
      {comments.map(comment => (
        <Comment
          comment={comment}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf().isRequired,
  updateComments: PropTypes.func.isRequired,
};
