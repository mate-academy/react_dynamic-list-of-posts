import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  selectedUser: User | null;
  onSelect: (v: User | null) => void;
  onPost: (v: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelect,
  onPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [menuActive, setMenuActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuActive(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleUserChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const currentUser = e.target as HTMLAnchorElement;

    if (currentUser.tagName === 'A') {
      const userId = Number(currentUser.getAttribute('data-user-id'));

      onSelect(users.find(user => user.id === userId) || null);
      setMenuActive(false);
      onPost(null);
    }
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': menuActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setMenuActive(prevState => !prevState)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" onClick={handleUserChange}>
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              data-user-id={user.id}
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
