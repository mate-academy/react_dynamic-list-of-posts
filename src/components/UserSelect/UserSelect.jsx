import React from 'react';
import PropTypes from 'prop-types';

import './UserSelect.scss';

export const UserSelect = ({ setUserId }) => {
  const selectHandle = function(event) {
    setUserId(event.target.value);
  };

  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        onChange={selectHandle}
      >
        <option value="0">All users</option>
        <option value="1">Leanne Graham</option>
        <option value="2">Ervin Howell</option>
        <option value="3">Clementine Bauch</option>
        <option value="4">Patricia Lebsack</option>
        <option value="5">Chelsey Dietrich</option>
        <option value="6">Mrs. Dennis Schulist</option>
        <option value="7">Kurtis Weissnat</option>
        <option value="8">Nicholas Runolfsdottir V</option>
        <option value="9">Glenna Reichert</option>
        <option value="10">Leanne Graham</option>
      </select>
    </label>
  );
};

UserSelect.propTypes = {
  setUserId: PropTypes.func.isRequired,
};
