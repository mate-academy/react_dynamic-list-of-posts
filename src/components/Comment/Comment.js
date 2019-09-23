import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div>
      <h5>{name}</h5>
      <p>{body}</p>
      <p>{email}</p>
      <hr className="comment__bottom-line" />
    </div>
  );
};

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

Comment.propTypes = {
  comment: shape.isRequired,
};

export default Comment;
