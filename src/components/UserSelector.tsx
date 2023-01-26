import React, { FC } from 'react';
import cn from 'classnames';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/User';
import { useUserStore } from '../store/userStore';
import { useUiStore } from '../store/uiStore';

export const UserSelector: FC = () => {
  const { data: users, isError, isLoading } = useUsers();
  const isVisible = useUiStore((state) => state.isSelectVisible);
  const setIsVisible = useUiStore((state) => state.setSelectVisibility);
  const user = useUserStore((state) => state.selectedUser);
  const selectUser = useUserStore((state) => state.selectUser);

  const onUserSelect = (usr: User) => {
    selectUser(usr);
    setIsVisible(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isVisible,
      })}
    >
      {isError && <p>Something went wrong</p>}
      {users?.length === 0 && <p>No user to select</p>}
      {users?.length !== 0 && !isError && !isLoading && (
        <>
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsVisible(!isVisible)}
            >
              {user ? <span>{user?.name}</span> : <span>Choose a user</span>}

              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map((u) => (
                <a
                  key={u.id}
                  href={`#/${String(u.id)}`}
                  className="dropdown-item"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    onUserSelect(u);
                  }}
                >
                  {u.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
