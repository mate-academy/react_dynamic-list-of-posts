import React, { useState } from 'react';
import { useUsers } from './UsersContext';
import { User } from '../types/User';
import cn from 'classnames';
interface Props {
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({ selectedUser }) => {
  const { users } = useUsers();
  const [dropdownStatus, setDropdownStatus] = useState(false);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownStatus(!dropdownStatus)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {dropdownStatus && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          onClick={() => setDropdownStatus(!dropdownStatus)}
        >
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#${user.id}`}
                  className={cn('dropdown-item', {
                    'is-active': user.id === selectedUser?.id,
                  })}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
