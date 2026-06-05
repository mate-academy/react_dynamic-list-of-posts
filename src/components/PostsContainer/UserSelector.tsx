import { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}
export const UserSelector = ({
  users,
  selectedUser,
  onSelectUser,
}: UserSelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handelClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectUser = (user: User) => {
    setIsDropdownOpen(false);
    onSelectUser(user);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={isDropdownOpen ? 'dropdown is-active' : 'dropdown'}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handelClick}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={
                  selectedUser?.id === user.id
                    ? 'dropdown-item is-active'
                    : 'dropdown-item'
                }
                key={user.id}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
