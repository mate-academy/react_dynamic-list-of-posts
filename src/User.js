import PropTypes from 'prop-types';
import React from 'react';

const User = ({ currentUser }) => (
  <div>
    <p>{currentUser.name}</p>
    <p>{currentUser.username}</p>
    <p>{currentUser.email}</p>
  </div>
);

User.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
