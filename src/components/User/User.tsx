import React from 'react';

interface User {
  name: string;
  email: string;
}

const UserItem: React.FC<User> = ({ name, email }) => (
  <div className="post__author">
    <p className="post__author-name">
      {name}
    </p>
    <p className="post__author-email">
      {email}
    </p>
  </div>
);

export default UserItem;
