import React from 'react';
import propTypes from 'prop-types';

function User({ user }) {
  return (
    <>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>
        {`${user.address.city
        } ${user.address.street
        } ${user.address.suite}`}
      </p>
    </>
  );
}

User.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
    email: propTypes.string,
    address: ({
      city: propTypes.string,
      street: propTypes.string,
      suite: propTypes.string,
    }).isRequired,
  }).isRequired,
};
export default User;
