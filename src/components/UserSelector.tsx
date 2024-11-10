import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const userSelect = useRef<HTMLDivElement | null>(null);
  const dropdownMenu = useRef<HTMLDivElement | null>(null);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownMenu.current &&
      userSelect.current &&
      !dropdownMenu.current.contains(event.target as Node) &&
      !userSelect.current.contains(event.target as Node)
    ) {
      setIsDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = (user: User) => {
    if (!selectedUser || user.id !== selectedUser.id) {
      setSelectedUser(user);
    }

    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
      ref={userSelect}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropdownMenu}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => {
                handleDropdownClick(user);
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
