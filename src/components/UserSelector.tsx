import { FC, useState } from 'react';
import cn from 'classnames';
import { useUsers } from '../hooks/useUsers';

export const UserSelector: FC = () => {
  const { data: users, isError, isLoading } = useUsers();
  const [isVisible, setIsVisible] = useState(false);

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
              onClick={() => setIsVisible((prevState) => !prevState)}
            >
              <span>Choose a user</span>

              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map((user) => (
                <a href={String(user.id)} className="dropdown-item">
                  {user.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
