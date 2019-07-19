import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userItem }) => (
  <div className="user-section">
    <span>
      {userItem.user.name}
    </span>
    <span>
      |
      {userItem.user.email}
    </span>
    <span>
      |
      {userItem.user.address.street}
      ,
    </span>
    <span>
      {userItem.user.address.suite}
      ,
    </span>
    <span>
      {userItem.user.address.city}
    </span>
  </div>
);

User.propTypes = {
  userItem: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default User;
