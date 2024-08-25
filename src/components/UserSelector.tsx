import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  onSetSelectUser: (user: User) => void;
  selectUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  onSetSelectUser,
  selectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownListOpen, setIsDropdownListOpen] = useState(false);

  useEffect(() => {
    const closeDropdownList = (e: MouseEvent) => {
      const target = e.target as Element;

      if (!target.closest('#dropdownList')) {
        setIsDropdownListOpen(false);
      }
    };

    document.body.addEventListener('click', closeDropdownList);
    getUsers().then(setUsers);

    return () => document.body.removeEventListener('click', closeDropdownList);
  }, []);

  function handleUserSelect(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const userId = Number(event.currentTarget.href.split('-')[1]);
    const newSelectUser = users.find(({ id }) => userId === id);

    if (newSelectUser) {
      setIsDropdownListOpen(false);
    }

    if (newSelectUser && userId !== selectUser?.id) {
      onSetSelectUser(newSelectUser);
    }
  }

  function handleToggleDropdownList() {
    setIsDropdownListOpen(prevState => !prevState);
  }

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownListOpen })}
      id="dropdownList"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleDropdownList}
        >
          {selectUser ? (
            <span>{selectUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i
              className={cn('fas', {
                'fa-angle-down': !isDropdownListOpen,
                'fa-angle-up': isDropdownListOpen,
              })}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectUser?.id,
              })}
              onClick={handleUserSelect}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
