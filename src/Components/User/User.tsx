import React, { FC } from 'react';
import { UserInterface } from '../../interfaces';
import { UserAddress } from '../UserAdress/UserAdress';
import './User.css';

interface UserProps {
  user: UserInterface;
}

export const User: FC<UserProps> = ({ user }) => {
  const {
    name,
    email,
    address,
  } = user;

  return (
    <>
      <li className="user__item user__item--name">
        {name}
      </li>
      <li className="user__item user__item--email">
        <a href="# ">
          {email}
        </a>
        <UserAddress address={address} />
      </li>
    </>
  );
};
