import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

function User(props) {
  const { name, email, address } = props.user;
  const { showAddress } = props;

  return (
    <div className="user-info">
      <p className="user-name">{name}</p>
      <p className="user-email">{email}</p>
      {showAddress && (
        <p className="user-address">
          {`${address.city}, ${address.street}, ${address.suite}`}
        </p>
      )}
    </div>
  );
}

User.defaultProps = {
  user: {},
  showAddress: {},
};

User.propTypes = {
  user: PropTypes.objectOf,
  showAddress: PropTypes.func,
};

export default User;
