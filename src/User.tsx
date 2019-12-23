import React from 'react';
import { UserInterface } from './interfaces';

interface Props {
  user: UserInterface;
}

const User: React.FC<Props> = ({ user }) => (
  <p className="post__author">
    <span>{user.name}</span>
    <br />
    <span>{user.email}</span>
    <br />
    <span>{user.address.city}</span>
  </p>
);

export default User;
