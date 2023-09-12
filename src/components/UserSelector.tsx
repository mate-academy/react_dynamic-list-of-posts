import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  setIsDropDownActive: (value: boolean) => void,
  isDropDownActive: boolean,
  setSelectedUser: (value: User) => void,
  selectedUser: User | null,
  setSelectedPost: (value: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setIsDropDownActive,
  isDropDownActive,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
}) => {
  const dropDownHandler = () => setIsDropDownActive(!isDropDownActive);

  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdown.current
        && isDropDownActive
        && !dropdown.current.contains(e.target as Node)) {
        setIsDropDownActive(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropDownActive]);

  const selectUserHandler = (user: User) => {
    if (selectedUser !== user) {
      setSelectedUser(user);
      setIsDropDownActive(false);
      setSelectedPost(null);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropDownActive })}
    >
      <div
        className="dropdown-trigger"
        ref={dropdown}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={dropDownHandler}
        >
          {selectedUser === null
            ? <span>Choose a user</span>
            : <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => selectUserHandler(user)}
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
