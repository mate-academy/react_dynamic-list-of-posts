import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="userBox">
      <h4>
        {user.name}
        |
      </h4>
      <p>
        E-mail:
        {user.email}
        |
      </p>
      <p>
        Address:
        {user.address.city}
        ,
        {user.address.street}
      </p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.object,
  city: PropTypes.string,
  street: PropTypes.string,
}.isRequired;

export default User;
