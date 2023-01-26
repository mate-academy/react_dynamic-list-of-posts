import { FC, MouseEvent, useState } from 'react';
import cn from 'classnames';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/User';
import { useUserStore } from '../store/userStore';

export const UserSelector: FC = () => {
  const { data: users, isError, isLoading } = useUsers();
  const [isVisible, setIsVisible] = useState(false);
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
      {users?.length !== 0 && !isError && (
        <>
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsVisible((prevState) => !prevState)}
              onBlur={() => setIsVisible(false)}
            >
              {user ? <span>{user?.name}</span> : <span>Choose a user</span>}

              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>

          {!isLoading && (
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {users.map((u) => (
                  <a
                    key={u.id}
                    href={`#/${String(u.id)}`}
                    className="dropdown-item"
                    onMouseDown={(e: MouseEvent) => {
                      e.preventDefault();
                      onUserSelect(u);
                    }}
                  >
                    {u.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
