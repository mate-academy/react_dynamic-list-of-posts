import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <article className="container">
    <p className="comment">{comment.body}</p>
    <div className="comment-name">
      <span className="li">{comment.name}</span>
      <a className="link" href="{comment.email}">
        {comment.email}
      </a>
    </div>
  </article>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
