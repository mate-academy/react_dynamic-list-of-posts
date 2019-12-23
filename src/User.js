import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, email, city }) => (
  <div className="userInfo">
    {` Name: `}
    <span className="userInfo__name">
      {name}
    </span>
    <span className="userInfo__email">
      {` Email: `}
      <a href=" ">
        {email}
      </a>
    </span>
    <span className="userInfo__adress">
      {` Sity: `}
      <a href=" ">
        {city}
      </a>
    </span>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default User;
