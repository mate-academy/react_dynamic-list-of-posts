import React from 'react';
import { User } from '../interfaces/data';

export const PostAuthor: React.FC<User> = ({ name, email, address }) => {
  return (
    <div className="post__author">
      <p>{name}</p>
      <p>{email}</p>
      <p>
        {`${address.city}, ${address.street} st., ${address.suite}`}
      </p>
    </div>
  );
};
