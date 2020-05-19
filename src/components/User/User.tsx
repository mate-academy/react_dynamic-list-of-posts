import React from 'react';
import './User.css';

type Props = {
  name: string;
  username: string;
  email: string;
  address: Address;
};

const User: React.FC<Props> = ({
  name, username, email, address,
}) => {
  return (
    <div className="user">
      <h2 className="user__nick">
        {`Post by: ${username}`}
      </h2>
      <p className="user__contacts">
        <span className="user__contacts-item">
          {name}
        </span>
        <br />
        <span className="user__contacts-item">
          {`${address.street} ${address.suite}`}
        </span>
        <br />
        <span className="user__contacts-item">
          {`${address.city} ${address.zipcode}`}
        </span>
        <br />
        <span className="user__contacts-item">
          <a href={`mailto:${email}`}>
            {email}
          </a>
        </span>
      </p>
    </div>
  );
};

export default User;
