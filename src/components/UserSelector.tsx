import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  isDropdownActive: boolean,
  setIsDropdownActive: (value: boolean) => void,
  selectedUser?: User | null,
  setSelectedUser: (user: User) => void,
  setSelectedPost: (post: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  isDropdownActive,
  setIsDropdownActive,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const dropdownHandler = () => setIsDropdownActive(!isDropdownActive);
  const dropdown = useRef<HTMLDivElement>(null);
  const closeDropdown = (e: MouseEvent) => {
    if (dropdown.current
      && isDropdownActive
      && !dropdown.current.contains(e.target as Node)) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownActive]);

  const handleSelectedUser = (user: User) => {
    if (user !== selectedUser) {
      setSelectedUser(user);
      setIsDropdownActive(false);
      setSelectedPost(null);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
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
          onClick={dropdownHandler}
        >

          {selectedUser === null
            ? <span>Choose a user</span>
            : <span>{selectedUser?.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => {
                  handleSelectedUser(user);
                }}
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
