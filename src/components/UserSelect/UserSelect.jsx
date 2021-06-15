import React from 'react';
import PropTypes from 'prop-types';

export const UserSelect = React.memo(
  ({ setSelectedUserId }) => {
    const handleChange = (event) => {
      setSelectedUserId(event.target.value);
    };

    return (
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          onChange={handleChange}
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
          <option value="10">Galina Lozinska</option>
        </select>
      </label>
    );
  },
);

UserSelect.propTypes = {
  setSelectedUserId: PropTypes.func.isRequired,
};
