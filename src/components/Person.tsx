import React, { FC } from 'react';
import { User } from '../interfaces';

interface Props {
  user: User;
}


export const Person: FC<Props> = ({ user }) => (
  <>
    <div className="person">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <ul className="person__address-list">
        <li>{user.address.street}</li>
        <li>{user.address.suite}</li>
        <li>{user.address.city}</li>
        <li>{user.address.zipcode}</li>
      </ul>
    </div>
  </>
);
