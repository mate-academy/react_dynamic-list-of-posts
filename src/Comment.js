import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment__item">
    <div className="comment__author">
      <span className="comment__author-name">{comment.name}</span>
      <span className="comment__author-email">{comment.email}</span>
    </div>
    <p className="comment__body">
      {comment.body}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
