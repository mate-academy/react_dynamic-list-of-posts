import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment-item">
    <h3>{comment.email}</h3>
    {comment.body}
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
