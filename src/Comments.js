import React from 'react';
import PropTypes from 'prop-types';

const Comments = ({ comment }) => (
  <li key={comment.id}>
    <h3 className="comment__name">
      {comment.name}
    </h3>
    <p className="comment__body">
      {comment.body}
    </p>
    <div className="comment__sender">
      {`Sender: `}
      <a href=" ">
        {comment.email}
      </a>
    </div>
  </li>
);

Comments.propTypes = {
  comment: PropTypes.shape({
    userId: PropTypes,
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comments;
