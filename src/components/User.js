import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div>
    <p>
      Author:
      {user.name}
    </p>
    <p>
      {`
        Author lives at ${user.address.suite}
        on ${user.address.street} street
        in ${user.address.city}
      `}
    </p>
    <p>
      <a href={`mailto: ${user.email}`}>
        {`Email ${user.name}`}
      </a>
    </p>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};

export default User;
