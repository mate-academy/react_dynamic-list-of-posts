import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (userToSelect: User) => void;
  setSelectedPost: (postToSelect: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const selectUserFunction = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();

    setSelectedUser(user);
    setSelectedPost(null);
    setMenuVisibility(false);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': users.length > 0 && menuVisibility,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={() => setMenuVisibility(true)}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser && selectedUser.name.length > 0
              ? selectedUser.name
              : 'Choose a user'}
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
              href={`user-${user.id}`}
              onClick={event => selectUserFunction(event, user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
