import React from 'react';
import './Comment.css';

type Props = {
  comment: Comment;
};

const Comment: React.FC<Props> = ({ comment: { name, email, body } }) => (
  <div className="comment">
    <h5 className="comment__name">{name}</h5>
    <p className="comment__body">{body}</p>
    <p>
      <a href={`mailto:${email}`} className="comment__email">
        {email}
      </a>
    </p>
  </div>

);

export default Comment;
