import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { GlobalContext } from '../../State';
import { getUsers } from '../api/getData';
import { User } from '../../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    setErrorMessage,
    setIsShowForm,
    setSelectedPost,
  } = useContext(GlobalContext);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handlShowDropdown = () => {
    setIsVisibleDropdown(!isVisibleDropdown);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setIsVisibleDropdown(!isVisibleDropdown);
    }
  };

  const hadleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsVisibleDropdown(false);
    setIsShowForm(false);
    setSelectedPost(null);
  };

  const fetchUsers = useCallback(async () => {
    try {
      setErrorMessage(false);

      const usersData = await getUsers();

      setUsers(usersData);
    } catch (error) {
      setErrorMessage(true);
    }
  }, [setUsers, setErrorMessage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisibleDropdown(false);
      }
    };

    if (isVisibleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisibleDropdown]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isVisibleDropdown })}
    >
      <div
        role="button"
        tabIndex={0}
        className="dropdown-trigger"
        onClick={handlShowDropdown}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
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
        style={{ display: isVisibleDropdown ? 'block' : 'none' }}
        ref={menuRef}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => hadleSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
