import React from 'react';

import './User.css';

class User extends React.Component {
  render() {
    const { name, email } = this.props.user;
    const { needEmail } = this.props;
    return (
      <div className="user">
        {
          name && (
            <p className="user__name">
              {name}
            </p>
          )
        }
        {
          email && (
            <p className="user__email">
              {email}
            </p>
          )
        }
      </div>
    );
  }
}

export default User;
