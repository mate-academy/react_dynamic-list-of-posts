import React from 'react';

function Comment ({ comment: { name, email, body } }) {
  return (
    <div>
      <h4 className="comment__header">{name}</h4>
      <a href={`mailto:${email}`} className="mail__link text-dark">{email}</a>
      <p className="comment__body">{body}</p>
    </div>
  );
}

export default Comment;
