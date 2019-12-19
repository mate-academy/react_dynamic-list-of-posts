import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comments__item">
    <p className="comments__text">{comment.body}</p>
    <div className="comments__author">
      <span>{comment.name}</span>
      <br />
      <span>{comment.email}</span>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
