import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div className="user">
    <div>
      author:
      {user.name}
    </div>
    <div>
      write me:
      {user.email}
    </div>
    <div>
      best regards from:
      {user.address.city}
      ,  street:
      {user.address.street}
      ,  flat:
      {user.address.suite}
      ,  zipcode:
      {user.address.zipcode}
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      suite: PropTypes.string,
      zipcode: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default User;
