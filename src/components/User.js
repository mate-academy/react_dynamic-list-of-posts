import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div className="post__users-data">
      <h4 className="post__users-data_autor">Autor:</h4>
      <div>
        <div>{user.name}</div>
        <div>{user.username}</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
}
User.propTypes = {
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default User;
