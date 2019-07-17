import React from 'react';
import PropTypes from 'prop-types';

const User = props => (
  <div className="user-info">
    <div>{ props.user.name }</div>
    <div>{ props.user.email }</div>
  </div>
);

User.propTypes = {
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default User;
