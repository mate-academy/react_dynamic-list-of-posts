import React from 'react';
import { UserProps } from '../types';

export const User: React.FC<UserProps> = ({ user }) => (
  <div>
    <b>{user ? user.name : ''}</b>
    <br />
    <span>{user ? user.email : ''}</span>
    <br />
    <span>
      {user ? user.address.city : ''}
      ,
      {user ? user.address.street : ''}
      <i> st.</i>
      <br />
      {user ? user.address.zipcode : ''}
    </span>
  </div>
);
