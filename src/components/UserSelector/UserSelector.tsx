import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUsers } from '../../api/user';
import { useSelectedUser } from '../Contexts/UserContext';

type Props = {
  isDropDownActive: boolean,
  onCloseDropDown: (status: boolean) => void,
  onChangeUser: (newUser: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  isDropDownActive,
  onCloseDropDown,
  onChangeUser,
}) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { selectedUser } = useSelectedUser();

  useEffect(() => {
    getUsers()
      .then(setAllUsers)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.info('Something went wrong');
      });
  }, []);

  const handleSelectUser = (user: User) => {
    onChangeUser(user);
    onCloseDropDown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropDownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => onCloseDropDown(!isDropDownActive)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        tabIndex={0}
        onBlur={() => onCloseDropDown(false)}
      >
        <div className="dropdown-content">
          {allUsers.map((user) => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item',
                { 'is-active': selectedUser?.id === user.id })}
              onClick={() => handleSelectUser(user)}
              key={user.id}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
