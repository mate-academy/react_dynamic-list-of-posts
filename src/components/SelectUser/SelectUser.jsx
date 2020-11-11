import React, { useCallback } from 'react';
import { SelectUserProps } from '../../props/SelectUserProps';

export const SelectUser = ({ userId, setUserId }) => (
  <label>
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      value={userId}
      onChange={useCallback(
        ({ target }) => {
          setUserId(+target.value);
        },
        [setUserId],
      )}
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

SelectUser.propTypes = SelectUserProps;
