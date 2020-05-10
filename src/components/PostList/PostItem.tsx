import React from 'react';
import { User } from '../Interface';

interface Props {
  id: number;
  title: string;
  body: string;
  user: User;
}

export const PostItem: React.FC<Props> = ({
  id,
  title,
  body,
  user,
}) => (
  <article className="message is-primary" id={`${id}`}>
    <div className="message-header">
      <h1 className="title has-text-white is-capitalized is-4">{title}</h1>
    </div>
    <div className="message-body">
      <h2 className="subtitle">
        {`Author: ${user.username}`}
      </h2>
      {body}
    </div>
  </article>
);
