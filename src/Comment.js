import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="Comments">
    <div>
      <span className="Comments__user">
        {comment.email + ': '}
      </span>
      <span className="Comments__title">
        {comment.name}
      </span>
    </div>
    <p>
      {comment.body}
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape(
    {
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }
  ).isRequired,

};

export default Comment;
