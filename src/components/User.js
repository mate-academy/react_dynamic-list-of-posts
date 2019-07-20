import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userItem }) => (
  <div className="user">
    <span className="user__name">
      {userItem.user.name}
    </span>
    <span className="user__email">
      {userItem.user.email}
    </span>
    <div className="user__adress">
      <span className="user__adress-street">
        {userItem.user.address.street}
      </span>
      <span className="user__adress-street">
        {userItem.user.address.suite}
      </span>
      <span className="user__adress-street">
        {userItem.user.address.city}
      </span>
    </div>
  </div>
);

User.propTypes = {
  userItem: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default User;
