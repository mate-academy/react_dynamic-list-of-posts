import React from 'react';
import './Comment.scss';

import PropTypes from 'prop-types';

export const Comment = ({ name, email, body }) => (
  <div className="Comment">
    <div className="CommentName">
      <span className="decorator">Comment by:</span>
      {name}
    </div>
    <div className="CommentEmail">
      <span className="decorator">Email:</span>
      <a href="/">{email}</a>
    </div>
    <div className="CommentBody">{body}</div>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
