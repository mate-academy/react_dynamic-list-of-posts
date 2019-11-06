import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <a href={`mailto:${user.email}`}>
    <Icon name="user outline" />
    {' '}
    {user.name}
  </a>
);

User.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default User;
