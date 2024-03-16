import React, { useCallback, useContext, useEffect, useState } from 'react';
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
    setIsloadingPosts,
    setErrorMessage,
    setIsShowForm,
    setSelectedPost,
  } = useContext(GlobalContext);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

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
      setIsloadingPosts(true);
      setErrorMessage(false);

      const usersData = await getUsers();

      setUsers(usersData);
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsloadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
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
          <span>{selectedUser ? selectedUser.name : 'Choose User'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisibleDropdown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
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
      )}
    </div>
  );
};
