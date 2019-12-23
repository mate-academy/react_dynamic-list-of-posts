import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="post__author author">
    <p>
      Post by:
      {' '}
      {user.name}
      {' '}
      from
      {' '}
      {user.address.city}
    </p>
    <p>{user.email}</p>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.object,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
