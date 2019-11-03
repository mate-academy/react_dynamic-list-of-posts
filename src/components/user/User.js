import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const User = ({ user }) => (
  <div>
    <Header as="h2">
      <a href={`mailto:${user.email}`}>{user.name}</a>
    </Header>
  </div>
);

export default User;

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
