import PropTypes from 'prop-types';
import React from 'react';

const Comment = ({ comment }) => (
  <div>
    <h3 className="headers">
      {comment.name}
    </h3>
    <p>
      {comment.email}
    </p>
    <p>
      {comment.body}
    </p>
  </div>
);

Comment.propTypes = { comment: PropTypes.objectOf(PropTypes.any).isRequired };

export default Comment;
