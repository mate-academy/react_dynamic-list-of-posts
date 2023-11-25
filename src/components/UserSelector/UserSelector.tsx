import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current
        && !selectorRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsActive(prev => !prev);
  };

  const handleOnSelect = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    setSelectedUser(event, user);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={selectorRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <UserInfo
                user={user}
                setSelectedUser={handleOnSelect}
                key={user.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
