import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

export const AsideSelect = ({ userID, selectUser, users }) => (
  <aside className="App__aside">
    <label className="App__aside-label">
      <h4 className="App__aside-title">Select a user: &nbsp;</h4>
      <select
        className="App__user-selector"
        value={userID}
        onChange={selectUser}
      >
        <option value="0">All users</option>
        {
          users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))
        }
      </select>
    </label>
  </aside>
);

AsideSelect.propTypes = {
  userID: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};
