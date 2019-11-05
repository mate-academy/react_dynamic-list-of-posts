import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Comment = ({ comment: { name, body } }) => (
  <Message>
    <Message.Header>{name}</Message.Header>
    <p>{body}</p>
  </Message>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
