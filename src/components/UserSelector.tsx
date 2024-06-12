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
    // Додаємо обробник подій при монтуванні компонента
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Видаляємо обробник подій при демонтуванні компонента
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

          {/* <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a>
          <a href="#user-3" className="dropdown-item">
            Clementine Bauch
          </a>
          <a href="#user-4" className="dropdown-item">
            Patricia Lebsack
          </a>
          <a href="#user-5" className="dropdown-item">
            Chelsey Dietrich
          </a> */}
        </div>
      </div>
    </div>
  );
};
