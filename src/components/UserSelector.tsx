import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';

import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Error } from '../types/Error';
import { Post } from '../types/Post';

type Props = {
  selectedUser: User | null,
  onSelectUser: (user: User) => void,
  onSelectPost: (post: Post | null) => void,
  onError: (error: (prevError: Error) => Error) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelectUser,
  onSelectPost,
  onError,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers)
      .catch(() => {
        onError(error => ({
          ...error,
          users: true,
        }));
      });
  }, []);

  const handleDropdown = () => {
    setIsDropdownVisible((current) => !current);
  };

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    onSelectPost(null);
    handleDropdown();
  };

  const handleBlur = (e: React.FocusEvent) => {
    const { current } = dropdownRef;

    if (current && !current.contains(e.relatedTarget)) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownVisible,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
          onBlur={handleBlur}
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
          {!users.length ? (
            <Loader />
          ) : (
            users?.map(user => {
              const { id, name } = user;

              return (
                <a
                  key={id}
                  href={`#user-${id}`}
                  onClick={() => handleSelectUser(user)}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUser?.id === id,
                  })}
                >
                  {name}
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
