import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userItem }) => (
  <div className="user_information">
    <p>
      <b>Name</b>
      {' '}
      {userItem.name}
    </p>
    <p>
      <b>Nick name</b>
      {' '}
      {userItem.username}
    </p>
    <p>
      <b>Email</b>
      {' '}
      {userItem.email}
    </p>
  </div>
);

User.propTypes = {
  userItem: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
