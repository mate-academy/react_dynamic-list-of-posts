import React from 'react';

import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div>
    <div className="comment-writer">
      <b>{comment.name}</b>
      <span className="italic">
        (email:
        {comment.email}
)
      </span>
    </div>
    <p className="comment-body">{comment.body}</p>
    <p>--- --- ---</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
    postId: PropTypes.number,
  }).isRequired,
};

export default Comment;
