import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../shapes/UserShape';

export const Select = ({ users, selectUser }) => (
  <label>
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      onChange={selectUser}
    >
      <option value="0">All users</option>
      {users.map(({ id, name }) => (
        <option value={id} key={id}>{name}</option>
      ))}
    </select>
  </label>
);

Select.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  selectUser: PropTypes.number.isRequired,
};
