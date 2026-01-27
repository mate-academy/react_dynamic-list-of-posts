import React from 'react';
import { User } from '../../types/User';
import { UserItem } from '../UserItem';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (person: User) => void;
};

export const UsersList: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser = () => {},
}) => {
  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            onSelectUser={onSelectUser}
          />
        ))}
      </div>
    </div>
  );
};
