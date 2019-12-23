import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div className="post__comments-subblock">
      <h5 className="post__comments-title">{comment.name}</h5>
      <div className="post__comments-body">{comment.body}</div>
      <em className="post__comments-email">{comment.email}</em>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
