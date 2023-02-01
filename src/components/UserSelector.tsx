import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from './API/Users';

type Props = {
  onUserSelect: (user: User) => void,
  selectedUser: User | null,
};

export const UserSelector: React.FC<Props> = ({
  onUserSelect,
  selectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUsers(result as User[]);
      });
  }, []);

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setIsDropDownOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropDownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
          }}
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className="dropdown-item"
              onClick={(event) => {
                event.preventDefault();
                handleUserSelect(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
