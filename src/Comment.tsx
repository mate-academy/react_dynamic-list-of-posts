import React from 'react';
import './Comment.scss';

const Comment: React.FC<Comment> = ({ name, body, email }) => (
  <div className="comment">
    <p className="comment__name">
      {name}
    </p>
    <p className="comment__text">
      {body}
    </p>
    <p className="comment__email">
      <a href={`mailto:${email}`}>
        {email}
      </a>
    </p>
  </div>
);

export default Comment;
