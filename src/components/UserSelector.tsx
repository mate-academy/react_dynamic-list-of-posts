import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (userId: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users = [],
  selectedUser,
  setSelectedUser = () => {},
}) => {
  const [usersListShow, setUsersListShow] = useState<boolean>(false);

  const dropdownContainer = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (
      dropdownContainer.current &&
      !dropdownContainer.current.contains(event.target as Node)
    ) {
      setUsersListShow(false);
    }
  };

  useEffect(() => {
    if (usersListShow) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
  }, [usersListShow]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': usersListShow })}
      ref={dropdownContainer}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUsersListShow(current => !current)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => {
                  setSelectedUser(user);
                  setUsersListShow(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        }
      </div>
    </div>
  );
};
