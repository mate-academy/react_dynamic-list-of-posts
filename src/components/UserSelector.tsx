import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/services';
import { User } from '../types/User';
import classNames from 'classnames';

interface UserProps {
  selectedUser: number | null;
  handleUserSelect: (userId: number) => void;
  openUser: boolean;
  setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (message: string) => void;
}

export const UserSelector: React.FC<UserProps> = ({
  selectedUser,
  handleUserSelect,
  openUser,
  setOpenUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  const toggleDropDown = () => {
    setOpenUser(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown')) {
        setOpenUser(false);
      }
    };

    if (openUser) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openUser, setOpenUser]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openUser })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropDown}
        >
          <span>
            {selectedUser
              ? users.find(user => user.id === Number(selectedUser))?.name ||
                'User  not found'
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser === user.id,
                })}
                onClick={() => handleUserSelect(user.id)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
