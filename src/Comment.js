import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comments__item">
    <li className="comments__name">{comment.name}</li>
    <p className="comments__email">
      By
      {' '}
      {comment.email}
    </p>
    <p className="comments__text">{comment.body}</p>
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
