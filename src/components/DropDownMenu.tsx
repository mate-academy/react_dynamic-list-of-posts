import React from 'react';
import { User } from '../types/User';
import { DropDownItem } from './DropDownItem';

type DropDownMenuProps = {
  users: User[];
  selectedUser: User | null;
  handleUserSelect: (user: User) => void;
};

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  users,
  selectedUser,
  handleUserSelect,
}) => {
  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
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
