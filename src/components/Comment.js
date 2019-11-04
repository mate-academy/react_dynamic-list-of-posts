import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Comment = ({ dataComment }) => (
  <div className="comment">
    <h3>{dataComment.email}</h3>
    <p>Comment:</p>
    <p>{dataComment.body}</p>
  </div>
);

Comment.propTypes = {
  dataComment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
