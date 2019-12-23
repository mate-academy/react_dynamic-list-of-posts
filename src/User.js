import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <>
    <p className="user">{user.name}</p>
    <p className="user">{user.email}</p>
    <p className="user">
      {`${user.address.city} ${user.address.street} ${user.address.suite}`}
    </p>
  </>
);

User.propTypes
  = { user: PropTypes.objectOf(PropTypes.string).isRequired };

export default User;
