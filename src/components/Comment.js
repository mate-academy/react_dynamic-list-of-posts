import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <>
    <div className="comment-body">{comment.body}</div>
    <div className="comment-author">
      name:
      {comment.name}
    </div>
    <div className="comment-author">
      mail:
      {comment.email}
    </div>
    <h7> - - - - - - - -</h7>
  </>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
export default Comment;
