import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div key={comment.id} className="comment-item">
    <h3>{comment.email}</h3>
    {comment.body}
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
