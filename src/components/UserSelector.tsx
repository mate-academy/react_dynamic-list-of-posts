import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  selectedUser: User | null;
  setOpenOrCloseMenu: Dispatch<SetStateAction<boolean>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUser,
  selectedUser,
  setOpenOrCloseMenu,
}) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsActiveMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsActiveMenu(false);
    setOpenOrCloseMenu(false);
  };

  const toggleDropdown = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActiveMenu,
      })}
      ref={menuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
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
              className={`dropdown-item ${selectedUser?.id === user.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                handleUserSelect(user);
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
