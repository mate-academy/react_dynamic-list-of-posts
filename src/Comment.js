import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ dataComment }) => (
  <pre className="App__comment">
    <div className="App__Coment_user">
      <p>{dataComment.name}</p>
      <p>{dataComment.email}</p>
    </div>
    <hr />
    <br />
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
