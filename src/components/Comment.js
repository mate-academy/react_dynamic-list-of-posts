import React from 'react';
import propTypes from 'prop-types';

const CommentComponent = ({ commentData }) => (
  <li key={commentData.id}>
    <h3>{commentData.name}</h3>
    <p>{commentData.body}</p>
    <p>{commentData.email}</p>
  </li>
);

CommentComponent.propTypes = {
  commentData: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    body: propTypes.string,
    email: propTypes.string,
  }).isRequired,
};
export default CommentComponent;
