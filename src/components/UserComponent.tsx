import React, { useCallback } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  user: User;
  selectedUser: User | null;
  onMenuActive: (value: boolean) => void;
  onSelectedUser: (value: User) => void;
}

export const UserComponent: React.FC<Props> = React.memo(
  ({ user, onSelectedUser, onMenuActive, selectedUser }) => {
    const handleSelect = useCallback(() => {
      onSelectedUser(user);
      onMenuActive(false);
    }, [onSelectedUser, onMenuActive, user]);

    return (
      <div className="dropdown-content">
        <a
          href={`#user-${user.id}`}
          className={cn('dropdown-item', {
            'is-active': user.id === selectedUser?.id,
          })}
          onClick={handleSelect}
        >
          {user.name}
        </a>
      </div>
    );
  },
);

UserComponent.displayName = 'UserComponent';
