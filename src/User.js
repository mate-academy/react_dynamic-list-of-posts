import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <ul className="user">
    <li className="user__name">
Author:
      {user.name}
    </li>
    <li className="user__email">
Email:
      {user.email}
    </li>
    <li className="user__address">
Address:
      {' '}
      {user.address.city}
,
      {' '}
      {user.address.street}
,
      {' '}
      {user.address.suite}
,
      {' '}
      {user.address.zipcode}
    </li>
  </ul>
);

User.propTypes = { user: PropTypes.arrayOf(PropTypes.object).isRequired };

export default User;
