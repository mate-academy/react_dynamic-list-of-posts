import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="post__user">
    <p>{`name: ${user.name}`}</p>
    <p>{`city: ${user.address.city}`}</p>
    <p>{`street: ${user.address.street} `}</p>
    <p>{`suite: ${user.address.suite} `}</p>
    <p>{`email: ${user.email}`}</p>
  </div>
);

User.propTypes
  = { user: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default User;
