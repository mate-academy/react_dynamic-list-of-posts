import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="comment__email">{ comment.email }</div>
    <h2 className="comment__name">{ comment.name }</h2>
    <p className="comment__text">{ comment.body }</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comment;
