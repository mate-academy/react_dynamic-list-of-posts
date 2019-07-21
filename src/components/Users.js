import React from 'react';
import PropTypes from 'prop-types';

function Users({ users }) {
  return (
    <div className="users alert-success">
      <p className="users__text">
         name:
        {users.name}
      </p>
      <p className="users__text">
        email:
        {users.email}
      </p>
      <p className="users__text">
        city:
        {users.address.city}
      </p>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.shape({
  }).isRequired,
};

export default Users;
