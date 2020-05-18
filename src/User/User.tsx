import React from 'react';
import './User.css';

type Props = {
  user?: User;
};

const User: React.FC<Props> = ({ user }) => (
  <div className="post__user user">
    <h4 className="user__name">{user?.name}</h4>
    <p className="user__email">
      <a href={`mailto:${user?.email}`}>
        {user?.email}
      </a>
    </p>
    <p>
      City:
      <br />
      <span className="user__address">{user?.address?.city}</span>
    </p>
    <p>
      Street:
      <br />
      <span className="user__address">{user?.address?.street}</span>
    </p>
    <p>
      Address:
      <br />
      <span className="user__address">{user?.address?.suite}</span>
    </p>
  </div>
);

export default User;
