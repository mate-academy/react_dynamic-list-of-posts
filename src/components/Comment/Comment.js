import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div className="comment">
      <h3 className="comment__name">{comment.name}</h3>
      <h4 className="comment__email">{comment.email}</h4>
      <p className="comment__body">{comment.body}</p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    postId: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
