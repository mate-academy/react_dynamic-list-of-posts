//import React from'react';
import React from 'react';
import { DropdownItem } from './DropdownItem/DropdownItem';
import { User } from '../../../types/User';

interface DropdownMenuProp {
  users: User[];
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenu: React.FC<DropdownMenuProp> = ({
  users,
  setIsActive,
}) => {
  return (
    <div tabIndex={1} className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {users.map(user => (
          <DropdownItem key={user.id} user={user} setIsActive={setIsActive} />
        ))}
      </div>
    </div>
  );
};
