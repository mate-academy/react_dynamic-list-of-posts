import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Comment = ({ comment }) => (
  <div className="comment-list__comment">
    <User email={comment.email} />
    <div>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
