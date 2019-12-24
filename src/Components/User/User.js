import React from 'react';
import PropTypes from 'prop-types';
import './user.css';

const User = ({ info }) => (
  <div>
    <h4>{info.name}</h4>
    <address>
      {info.address.city}
      {info.address.street}
      {info.address.suite}
      <a href={info.email} className="link link--user">{info.email}</a>
    </address>
  </div>
);

User.propTypes
  = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.object.isRequired,
      phone: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      company: PropTypes.object.isRequired,
    }),
  };

User.defaultProps = { info: {} };

export default User;
