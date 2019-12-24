import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <article>
    <div className="comment">
      <p>
        {comment.body}
        {' - '}
      </p>
      <span className="li">
        {comment.name}
        {' - '}
      </span>
      <a href="{comment.email}">
        {comment.email}
      </a>
    </div>
  </article>
);

Comment.propTypes = { comment: PropTypes.objectOf(PropTypes).isRequired };

export default Comment;
