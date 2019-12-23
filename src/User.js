import React from 'react';
import PropsTypes from 'prop-types';

const User = ({ person, address }) => (
  <div className="post__author">
    <p className="author__name">
      {person.name}
    </p>
    <p className="author__email">
      {person.email}
    </p>
    <address className="author__address">
      {address
        ? person.address.street
        : ''
      }
    </address>
  </div>
);

User.propTypes = {
  person: PropsTypes.objectOf.isRequired,
  address: PropsTypes.bool.isRequired,
};

export default User;
