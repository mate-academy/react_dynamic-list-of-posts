import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment">
    <p>
      {'Comment - '}
      {comment.id}
    </p>
    <p>
      {comment.body}
    </p>
    <p>
      {'E-mail - '}
      {comment.email}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
