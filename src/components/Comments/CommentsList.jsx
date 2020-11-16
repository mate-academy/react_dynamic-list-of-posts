import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from './Comment';

export const CommentsList = ({ remove, comments }) => (
  <ul className="PostDetails__list">
    {comments.map(comment => (
      <Comment
        key={comment.id}
        comment={comment}
        remove={remove}
      />
    ))}
  </ul>
);

CommentsList.propTypes = {
  remove: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
