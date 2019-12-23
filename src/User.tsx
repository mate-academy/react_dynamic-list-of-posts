import React from 'react';
import { Client } from './interfaces';

interface UserProps {
  user: Client;
}

const User: React.FC<UserProps> = ({ user }) => (
  <p className="post__author">
    <span>{user.name}</span>
    <br />
    <span>{user.email}</span>
    <br />
    <span>{user.address.city}</span>
  </p>
);

export default User;
