import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './Comment.css';

const Comment = ({ comment }) => {
  const { body, email, name } = comment;

  return (
    <div className="comment">
      <p>
        {body}
      </p>
      <User name={name} email={email} />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Comment;
