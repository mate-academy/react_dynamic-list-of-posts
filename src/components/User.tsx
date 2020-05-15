import React from 'react';
import './User.css';

type Props = {
  postUser: UserFromServer;
};

export const User: React.FC<Props> = ({ postUser }) => {
  const { name, email, address } = postUser;

  return (
    <>
      <li className="user__item">
        <span className="user__name">{name}</span>
      </li>
      <li className="user__item">
        <span className="user__email">{email}</span>
      </li>
      <li className="user__item">
        <span className="user__city">
          {address.city}
          ,
        </span>
        <span className="user__street">
          {address.street}
          ,
        </span>
        <span className="user__zipcode">{address.zipcode}</span>
      </li>
    </>
  );
};
