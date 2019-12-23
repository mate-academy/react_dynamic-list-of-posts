import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="comment_name">{comment.name}</div>
  </div>
);

Comment.propTypes
 = { comment: PropTypes.objectOf(PropTypes.string).isRequired };

export default Comment;
