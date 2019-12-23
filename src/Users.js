import React from 'react';
import PropTypes from 'prop-types';

const Users = ({ user }) => (
  <div>
    <p className="name">{user.name}</p>
    <p className="email">{user.email}</p>
    <p>{user.phone}</p>
    <p>{user.address.street}</p>
  </div>
);

Users.propTypes = { user: PropTypes.arrayOf(PropTypes.object).isRequired };

export default Users;
