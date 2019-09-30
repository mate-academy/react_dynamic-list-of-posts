import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

function Comment({ comment }) {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <div>{body}</div>
      <div>
        <p>{name}</p>
        <p>
          {email}
        </p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
