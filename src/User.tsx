import React from 'react';
import './User.scss';

type UserProps ={
  user: User;
};

const User: React.FC<UserProps> = ({ user }) => (
  <section className="user ">
    <p className="user__name">
      {user.name}
    </p>
    <div className="user__address">
      <p className="user__city">
        {user.address.city}
        ,
      </p>
      <p className="user__street">
        {user.address.street}
        ,
      </p>
      <p className="user__suite">
        {user.address.suite}
        ,
      </p>
      <a href={`mailto:${user.email}`} className="comment__email">
        {user.email}
      </a>
    </div>
  </section>
);

export default User;
