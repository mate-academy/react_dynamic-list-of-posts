import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  const { name, email } = user;

  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
  }),
}).isRequired;

User.propTypes = { user: userPropTypes.isRequired };

export default User;
