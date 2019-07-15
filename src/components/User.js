import React from 'react';

import PropTypes from 'prop-types';

const User = ({ user }) => (
  <>
    <div className="user">
      <h2>{user.name}</h2>
      <h6>{user.email}</h6>
      <div>
        {user.address.city}
        {user.address.street}
        <p>
          zipcode:
          {user.address.suite}
        </p>
      </div>
    </div>
  </>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

export default User;
