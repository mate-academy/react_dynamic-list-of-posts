import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="comment__name">{comment.name}</div>
    <div className="comment__body">{comment.body}</div>
    <div className="comment__email">{comment.email}</div>
    <hr />
  </div>
);

Comment.propTypes
  = { comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired };

export default Comment;
