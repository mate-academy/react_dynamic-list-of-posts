import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="content">
      <a className="author">{comment.name}</a>
      <div className="item meta">
        <i className="mail icon" />
        <a href={`mailto:${comment.email}`} className="content">
          {comment.email}
        </a>
      </div>
      <div className="text">
        {comment.body}
      </div>
      <div className="actions">
        <a className="reply">Reply</a>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
