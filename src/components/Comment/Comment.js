import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

export const Comments = ({ comment }) => (
  <div className="card-body">
    <li className="card-title">{comment.name}</li>
    <p className="card-text card-email">{comment.email}</p>
    <p className="card-text">{comment.body}</p>
  </div>
);

Comments.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
