import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userOne }) => (
  <div className="user">
    {'written by '}
    {userOne.name}
    { }
    {userOne.email}
    { }
    {userOne.address.city}
  </div>
);

User.propTypes = { userOne: PropTypes.objectOf(PropTypes.any).isRequired };

export default User;
