import PropTypes from 'prop-types';
import React from 'react';

const User = ({ user }) => (
  <section className="userSection">
    {user.name}
    <br />
    {user.email}
    <br />
    {`${user.address.street} `}
    {`${user.address.suite} `}
    {`${user.address.city} `}
    {`${user.address.zipcode} `}
    {`${user.address.geo.lat} `}
    {`${user.address.geo.lng} `}
  </section>
);

User.propTypes = { user: PropTypes.objectOf(PropTypes.any).isRequired };

export default User;
