import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="user-info">
    <div>{ user.name }</div>
    <div>{ user.email }</div>
  </div>
);

User.propTypes = {
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default User;
