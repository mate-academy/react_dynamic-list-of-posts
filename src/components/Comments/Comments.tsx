import React from 'react';
import './Comments.css';

type Props = {
  name: string;
  email: string;
  body: string;
};

const Comments: React.FC<Props> = ({ name, email, body }) => (
  <div className="comments__item">
    <p className="author">
      {name[0].toUpperCase() + name.slice(1)}
      <a href="mailto:example@gmail.com" className="author__email">{email}</a>
    </p>
    <p>
      {body[0].toUpperCase() + body.slice(1)}
    </p>
  </div>
);

export default Comments;
