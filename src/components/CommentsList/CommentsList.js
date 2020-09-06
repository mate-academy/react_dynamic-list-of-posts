import React from 'react';
import PropTypes from 'prop-types';

import { Comment } from '../Comment/Comment';

export const CommentsList = ({ comments }) => (
  <div className="CommentList">
    {comments.map(comment => (
      <Comment
        key={comment.id}
        name={comment.name}
        email={comment.email}
        body={comment.body}
      />
    ))}
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
