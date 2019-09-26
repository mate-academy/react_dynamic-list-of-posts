import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({
  name,
  email,
  address,
}) => (
  <div>
    <p className="name">
      {name}
    </p>
    <p>
      {email}
    </p>
    {address && (
      <p>
        {`${address.city}, ${address.street}, ${address.suite},
        ${address.zipcode}`}
      </p>
    )}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
    street: PropTypes.string,
    suite: PropTypes.string,
    zipcode: PropTypes.string,
  }),
};

User.defaultProps = {
  address: null,
};

export default User;
