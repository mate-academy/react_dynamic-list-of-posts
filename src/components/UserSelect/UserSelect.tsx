import React from 'react';
import './UserSelect.scss';

interface Props {
  userSelect: string,
  handleSetUserSelect: any,
}

export const UserSelect: React.FC<Props> = ({ userSelect, handleSetUserSelect }) => (
  <label>
    Select a user: &nbsp;

    <select
      className="user-selector"
      value={userSelect}
      onChange={handleSetUserSelect}
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
