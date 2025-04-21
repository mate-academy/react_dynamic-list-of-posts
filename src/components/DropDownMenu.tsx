import React from 'react';
import { User } from '../types/User';
import { DropDownItem } from './DropDownItem';
import classNames from 'classnames';

type DropDownMenuProps = {
  openedDropDown: boolean;
  users: User[];
  selectedUser: User | null;
  handleUserSelect: (user: User) => void;
};

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  openedDropDown,
  users,
  selectedUser,
  handleUserSelect,
}) => {
  return (
    <div
      className={classNames('dropdown-menu', { 'is-active': openedDropDown })}
      id="dropdown-menu"
      role="menu"
    >
      <div className="dropdown-content">
        {users.map(user => (
          <DropDownItem
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            handleUserSelect={handleUserSelect}
          />
        ))}
      </div>
    </div>
  );
};
