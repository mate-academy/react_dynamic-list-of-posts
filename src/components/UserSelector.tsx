import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { usePostContext } from '../context/PostProvider';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, person, setPerson } = usePostContext();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleButtonClick = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleUserClick = (user: User) => {
    setPerson(user);
    setOpenDropdown(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as Element;

    if (!targetElement.closest('.dropdown')) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', () => handleDocumentClick);

    return () => {
      document.removeEventListener('click', () => handleDocumentClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': openDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleButtonClick}
        >
          <span>{person?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
