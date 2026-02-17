import React, { useEffect, useRef } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  isSelectActive: boolean;
  selectedUser: User | null;
  handleOpen: () => void;
  onSelect: (user: User) => void;
  setSelectActive: (value: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  isSelectActive,
  selectedUser,
  handleOpen,
  onSelect,
  setSelectActive,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setSelectActive(false);
      }
    };

    if (isSelectActive) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSelectActive, setSelectActive]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isSelectActive })}
      ref={dropDownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpen}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => {
                onSelect(user);
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
