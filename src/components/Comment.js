import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentItem: comment }) => (
  <div className="comment_box">
    <div>
      <span className="comment_author">{comment.name}</span>
      <span>{comment.email}</span>
    </div>
    <p>{comment.body}</p>
  </div>
);

Comment.propTypes = {
  commentItem: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
