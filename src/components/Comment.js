import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment: { name, body, email } }) {
  return (
    <div className="comment">
      <p>{email}</p>
      <p>{name}</p>
      <p>
        Comments:
        {body}
      </p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
