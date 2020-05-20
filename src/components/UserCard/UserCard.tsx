import React from 'react'
import { User } from '../../helpers/api';
import './UserCard.css';

type Props = {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => (
  <div className="post__autor user" key={user.id}>
    <div className="user__info">
      <span className="user__info-decor">Autor: </span>
      {user.name}
    </div>
    <div className="user__info">
      <span className="user__info-decor">Email: </span>
      {user.email}
    </div>
    <div className="user__info">
      <span className="user__info-decor">Address: </span>
      {user.address.city}
      ,{' '}
      {user.address.street}
      ,{' '}
      {user.address.suite}
    </div>
  </div>
)
