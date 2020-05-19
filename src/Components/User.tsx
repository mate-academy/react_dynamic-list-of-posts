import React from 'react';

type Props = {
  user: User;
};

const User: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <div className="post__author">
      <span className="post__author-name">{user.name}</span>
      <a href="link" className="post__author-email">
        {user.email}
      </a>
      <span className="post__author-address">
        {`${user.address.street} ${user.address.suite} ${user.address.city}`}
      </span>
    </div>
  );
};

export default User;
