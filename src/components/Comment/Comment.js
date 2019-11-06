import React from 'react';
import PropTypes from 'prop-types';
import './comment.css';

function Comment({ comment }) {
  return (
    <div className="comment">
      <a className="comment__author author" href={`mailto:${comment.email}`}>
        {comment.name}
      </a>
      <p className="comment__text text">{comment.body}</p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    postID: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
