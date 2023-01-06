import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

export type Props = {
  users: User[],
  selectedUser: User | null,
  onSelectUser: React.Dispatch<React.SetStateAction<User | null>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onChangeMenu = () => {
    setIsMenuOpened(current => !current);
  };

  const userTogging = (person: User) => {
    onSelectUser(person);
    setIsMenuOpened(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isMenuOpened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onChangeMenu}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item', { 'is-active': selectedUser?.id === user.id },
              )}
              onClick={() => userTogging(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
