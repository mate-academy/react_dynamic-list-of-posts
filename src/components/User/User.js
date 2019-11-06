import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="post__author author">
      <a className="user__name name" href={`mailto:${user.email}`}>
        {user.name}
      </a>
      <br />
      <span className="user__address address">
        {`${user.address.street} ${user.address.suite}, ${user.address.city}`}
      </span>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default User;
