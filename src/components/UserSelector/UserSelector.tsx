import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';

interface Props {
  users: User[];
  onUserSelect: (user: User) => void
}

export const UserSelector: React.FC<Props> = (props) => {
  const { users, onUserSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('Choose a user');
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!dropdown.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelect = (user: User) => {
    onUserSelect(user);
    setIsOpen(false);
    setCurrentUser(user.name);
  };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdown}
      className={cn('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpen}
        >
          <span>
            {currentUser}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={cn('dropdown-item', {
                  'is-active': currentUser === user.name,
                })}
                onClick={() => handleSelect(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
