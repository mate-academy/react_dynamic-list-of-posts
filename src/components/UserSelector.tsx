import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import '../styles/usersList.scss';

type Props = {
  users: User[],
  selectedUser: User | null,
  onSelectedUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectedUser,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsActive(prevState => !prevState);
  };

  const handleSelectedUser = (user: User) => {
    onSelectedUser(user);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          <ul className="content users-list">
            {users.map(({
              id,
              name,
              email,
              phone,
            }) => (
              <li key={id} className="user">
                <a
                  href={`#user-${id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': id === selectedUser?.id },
                  )}
                  onClick={() => {
                    handleSelectedUser({
                      id,
                      name,
                      email,
                      phone,
                    });
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
