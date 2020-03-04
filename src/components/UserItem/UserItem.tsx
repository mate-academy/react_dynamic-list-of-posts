import React, { FC } from 'react';
import './UserItem.css';

interface Props {
  user: User;
}

export const UserItem: FC<Props> = ({ user }) => {
  const { name, username, email } = user;

  return (
    <div className="post-author">
      <p>{email}</p>
      <a href="null">
        <p>{username}</p>
      </a>
      <p>{name}</p>
    </div>
  );
};
