import React from 'react';
import PropTypes from 'prop-types';

import './User.css';

class User extends React.Component {
  render() {
    const { name, email } = this.props.user;
    return (
      <div className="user">
        {
          name && (<p className="user__name">{name}</p>)
        }
        {
          email && (<p className="user__email">{email}</p>)
        }
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
