import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <article>
    <h2 className="comments__name">{comment.name}</h2>
    <p>{comment.body}</p>
    <p className="comments__text">
      Comments by&nbsp;
      <a href={comment.email} className="link">
        {comment.email}
      </a>
    </p>
  </article>
);

Comment.propTypes
  = {
    comment: PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      body: PropTypes.string,
    }),
  };

Comment.defaultProps
  = {
    comment: {
      postId: null,
      id: null,
      name: '',
      email: '',
      body: '',
    },
  };

export default Comment;
