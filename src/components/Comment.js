import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div className="post_comment-list_comment">
      <span>{comment.name}</span>
      {' '}
      <span>{comment.email}</span>
      <div>{comment.body}</div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
