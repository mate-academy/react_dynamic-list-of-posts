import React, { useState, useRef } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  userData: User[];
  user: User | null;
  setUser: (value: User) => void;
}

export const UserSelector: React.FC<Props> = ({ userData, user, setUser }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdawnRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;

    if (!dropdawnRef.current?.contains(relatedTarget)) {
      setIsDropdown(false);
    }
  };

  return (
    <div
      ref={dropdawnRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdown })}
      onBlur={handleBlur}
      onClick={() => setIsDropdown(prev => !prev)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {userData.map(person => {
            const isPersonSelected = user?.id === person.id;

            return (
              <a
                key={person.id}
                href={`#user-${person.id}`}
                className={cn('dropdown-item', {
                  'is-active': isPersonSelected,
                })}
                onClick={() => setUser(person)}
              >
                {person.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
