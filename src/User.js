import React from 'react';
import './User.css';

const User = ({ userData }) => (
  <div className="user">
    <span className="user_name">
      {userData.name}, the &nbsp;
    </span>
    <span className="user_nickname">
      ({userData.username})
    </span>
    <div className="user_email">
      {userData.email}
    </div>
  </div>
);

export default User;
