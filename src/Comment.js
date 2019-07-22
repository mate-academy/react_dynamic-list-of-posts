import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ preparedComment }) => (
  <pre className="App__comment">
    <h3>{preparedComment.email}</h3>
    <p>Comment:</p>
    <p>{preparedComment.body}</p>
  </pre>
);

Comment.propTypes = {
  preparedComment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
