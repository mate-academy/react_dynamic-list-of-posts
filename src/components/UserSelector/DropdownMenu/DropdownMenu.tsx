import React, { useEffect, useState } from 'react';
import { DropdownItem } from './DropdownItem';
import { User } from '../../../types/User';

interface DropdownMenuProps {
  users: User[];
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserWithKey extends User {
  key: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  users,
  setIsActive,
}) => {
  const [usersWithKeys, setUsersWithKeys] = useState<UserWithKey[]>([]);

  useEffect(() => {
    const generateUniqueKeys = (userList: User[]): UserWithKey[] => {
      return userList.map(user => ({
        ...user,
        key: `${user.id}-${Math.random().toString(36).substr(2, 9)}`,
      }));
    };

    setUsersWithKeys(generateUniqueKeys(users));
  }, [users]);

  return (
    <div tabIndex={1} className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {usersWithKeys.map(user => (
          <DropdownItem key={user.id} user={user} setIsActive={setIsActive} />
        ))}
      </div>
    </div>
  );
};
