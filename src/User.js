import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="user">
    {`${user.name} email: ${user.email} from ${user.address.city}`}
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

export default User;
