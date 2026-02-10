import React, { useState, useRef, useEffect } from 'react';
import { User } from './/../types/User';

type Props = {
  users: User[];
  chosenUser: User | null;
  setCurrentUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  chosenUser,
  setCurrentUser,
}) => {
  const [isOpen, setIsOpent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpent(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpent(!isOpen)}
        >
          <span>{chosenUser ? chosenUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={`dropdown-item ${chosenUser?.id === user.id ? 'is-active' : ''}`}
              onClick={() => {
                setCurrentUser(user);
                setIsOpent(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
