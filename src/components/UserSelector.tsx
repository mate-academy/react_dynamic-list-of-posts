import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  onSelectUser: (user: User | null) => void,
  selectUser: User | null,
  setOpenedSidebar: (open: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectUser,
  setOpenedSidebar = () => {},
}) => {
  const [focus, setFocus] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdown.current
        && focus
        && !dropdown.current.contains(e.target as Node)) {
        setFocus(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [focus]);

  const handleFocus = () => {
    if (focus) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  const handleChooseUser = (user: User) => {
    onSelectUser(user);
    setFocus(false);
    setOpenedSidebar(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={focus ? 'dropdown is-active' : 'dropdown'}
    >
      <div className="dropdown-trigger" ref={dropdown}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleFocus}
        >
          <span>{selectUser ? (selectUser.name) : ('Choose a user')}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map((user) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={selectUser?.id === user.id
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'}
                onClick={() => handleChooseUser(user)}
              >
                {user.name}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
};
