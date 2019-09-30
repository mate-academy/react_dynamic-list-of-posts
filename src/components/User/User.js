import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="user">
      <h2 className="username">{user.name}</h2>
      <p className="usermail">{user.email}</p>
      <p className="useradress">{user.address.city}</p>
      <p className="useradress">{user.address.street}</p>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  adress: PropTypes.shape({
    street: PropTypes.string.isRequired,
    suite: PropTypes.string,
    city: PropTypes.string.isRequired,
    zipcode: PropTypes.string,
    geo: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
  }),
};

export default User;
