import React from 'react';
import './User.css';

interface UserProps {
  userData: User;
}

export const User: React.FC<UserProps> = (props) => {
  const { userData } = props;

  return (
    <div className="user">
      <p className="user__name">{userData.name}</p>
      <p>{userData.email}</p>
      <p>{`${userData.address.city} ${userData.address.street}`}</p>
    </div>
  );
};
