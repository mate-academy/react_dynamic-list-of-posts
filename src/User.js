import React from 'react';
import PropTypes from 'prop-types';

const User = ({ preparedUser }) => (
  <div>
    <p>{preparedUser.name}</p>
    <p>{preparedUser.username}</p>
    <p>{preparedUser.email}</p>
  </div>
);

User.propTypes = {
  preparedUser: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
