import React, { useEffect, useRef, useState } from 'react';
import { UsersList } from '../UsersList';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSelectUser: (person: User) => void;
  selectedUser: User | null;
};
export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser = () => {},
  selectedUser,
}) => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsShowUsers(prev => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShowUsers(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isShowUsers ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <UsersList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={user => {
          onSelectUser(user);
          setIsShowUsers(false);
        }}
      />
    </div>
  );
};
