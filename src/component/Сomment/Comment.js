import React from 'react';
import PropTypes from 'prop-types';

import './Comment.css';

const Comment = ({ comment }) => (
  <div className="comment-list__comment comment">
    <h3 className="comment__title">{comment.name}</h3>
    <p className="comment__text">{comment.body}</p>
    <p className="comment__author">
      <span className="comment__revisor">{comment.email}</span>
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
