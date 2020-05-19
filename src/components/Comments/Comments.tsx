import React from 'react';
import './Comments.css';
import { capitalize } from '../../helpers/capitalize';

type Props = {
  name: string;
  email: string;
  body: string;
};

const Comments: React.FC<Props> = ({ name, email, body }) => (
  <div className="comments__item">
    <p className="author">
      {capitalize(name)}
      <a href="mailto:example@gmail.com" className="author__email">{email}</a>
    </p>
    <p>
      {capitalize(body)}
    </p>
  </div>
);

export default Comments;
