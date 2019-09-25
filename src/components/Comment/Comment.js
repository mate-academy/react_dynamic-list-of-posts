import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  const { name, email, body } = comment;
  const commentName = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;

  return (
    <div className="comment">
      <p>
        {email}
      </p>
      <h3>{commentName}</h3>
      <p>{body}</p>
    </div>
  );
};

const commentPropsType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

Comment.propTypes = {
  comment: commentPropsType.isRequired,
};

export default Comment;
