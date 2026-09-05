import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../servises/user';
import { User } from '../types/User';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  selectedUser: User | null;
  setSelectedUser: (v: User) => void;
  setOpenPost: (v: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setOpenPost,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers().then(usersFromServer => {
      setUsers(usersFromServer);
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => {
            const isSelected = selectedUser?.id === user.id;

            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': isSelected,
                })}
                onClick={e => {
                  e.preventDefault();
                  setIsDropdownOpen(false);

                  if (!isSelected) {
                    setSelectedUser(user);
                    setOpenPost(null);
                  }
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
