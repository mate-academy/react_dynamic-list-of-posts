import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { User } from '../../types';
import { getUsers } from '../../services';

interface Props {
  selectedUser: User | null;
  onSelectedUser: (user: User | null) => void;
  onLoadPosts: (userId: User['id']) => void;
}

export const UserSelector: FC<Props> = ({
  selectedUser,
  onSelectedUser,
  onLoadPosts,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasLoadingUserError, setHasLoadingUserError] = useState(false);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const handleSelectUser = (user: User) => {
    onSelectedUser(user);
    setIsActiveDropdown(false);
    onLoadPosts(user.id);
  };

  useEffect(() => {
    setHasLoadingUserError(false);

    getUsers()
      .then(setUsers)
      .catch(() => setHasLoadingUserError(true));
  }, []);

  if (hasLoadingUserError) {
    return <div className="notification is-danger">Unable to load users</div>;
  }

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActiveDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropdown(current => !current)}
          onBlur={() => setIsActiveDropdown(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === id,
                })}
                onMouseDown={() => handleSelectUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
