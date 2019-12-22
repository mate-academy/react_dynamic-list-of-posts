import PropTypes from 'prop-types';
import React from 'react';

const Comment = ({ comment: { name, body, email } }) => (
  <div>
    <h3>{name}</h3>
    <p>{body}</p>
    <p>
      <span>By </span>
      {email}
    </p>
  </div>
);

Comment.propTypes
  = { comment: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default Comment;
