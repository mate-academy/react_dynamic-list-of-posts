import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment: { name, body, email } }) {
  return (
    <div className="comment">
      <p className="name">{name}</p>
      <p className="email">{email}</p>
      <br />
      <p>
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
