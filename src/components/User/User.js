import React from 'react';
import './User.scss';
import { UserProps } from '../../constants/proptypes';

const User = ({ user }) => {
  const { name, email, address } = user;

  return (
    <div className="user">
      {name && (
        <p className="user--text">
          <span className="user__text">By</span>
          <span className="user__name">{name}</span>
        </p>
      )}
      <p className="user__email user--text">{email}</p>
      {address && (
        <div className="user__address">
          <p className="user--text">
            {`${address.city}, ${address.street}`}
          </p>
          <p className="user--text">
            {`${address.zipcode}`}
          </p>
        </div>
      )}
    </div>
  );
};

User.propTypes = UserProps;

User.defaultProps = {
  name: null,
  address: null,
};

export default User;
