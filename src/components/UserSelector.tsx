import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { ErrorType } from '../types/ErrorType';
import { Load } from '../types/Load';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  selectedUser: User | null;
  setSelectedUser: (value: User) => void;
  setSelectedPost: (value: Post | null) => void;
  setLoading: (value: Load) => void;
  setError: (value: ErrorType) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setSelectedPost,
  setLoading,
  setError,
}): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client
      .get<User[]>(`/users`)
      .then(res => setUsers(res))
      .catch(() => setError(ErrorType.FetchUsers));
  }, [setError]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleChoose = (user: User) => {
    setIsDropdownOpen(false);

    if (user === selectedUser) {
      return;
    }

    setLoading(Load.Posts);
    setSelectedUser(user);
    setSelectedPost(null);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
                  'is-active': selectedUser === user,
                })}
                onClick={() => handleChoose(user)}
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
