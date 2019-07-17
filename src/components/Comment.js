import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => (
  <div className="comment">
    <div className="comment__email">{ props.comment.email }</div>
    <h2 className="comment__name">{ props.comment.name }</h2>
    <p className="comment__text">{ props.comment.body }</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Comment;
