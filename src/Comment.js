import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ dataComment }) => (
  <pre className="App__comment">
    <h3>{dataComment.email}</h3>
    <p>Comment:</p>
    <p>{dataComment.body}</p>
  </pre>
);

Comment.propTypes = {
  dataComment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
