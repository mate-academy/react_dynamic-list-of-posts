import React from 'react';
import PropTypes, { string } from 'prop-types';

const User = ({ user }) => (
  <div className="author">
    <p className="user-name">{user.name}</p>
    <p className="city">{user.address.city}</p>
    <a className="link" href="{user.email}">
      {user.email}
    </a>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: string.isRequired,
    address: string.isRequired,
    email: string.isRequired,
  }).isRequired,
};

export default User;
