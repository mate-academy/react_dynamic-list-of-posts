import React, { useContext, useEffect, useRef } from 'react';
import { User } from '../../types/User';
import { UserItem } from '../UserItem/UserItem';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import classNames from 'classnames';

type UserSelectorProps = {
  users: User[];
  handleSelectUser: (userId: User['id']) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  handleSelectUser,
}) => {
  const { selectedUser, visibleUsers, setVisibleUsers } =
    useContext(CurrentUserContext);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropDown = document.querySelector('.dropdown');

      if (dropDown && !dropDown.contains(event.target as Node)) {
        setVisibleUsers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdown = () => {
    setVisibleUsers(!visibleUsers);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': visibleUsers,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="false"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropDownRef}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              handleSelectUser={handleSelectUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
