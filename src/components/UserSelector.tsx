import {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { getUsers } from '../api/users';
import { User } from '../types/User';

interface Props {
  userId: number | null,
  onSelectUserId: (userId: number | null) => void;
}
export const UserSelector: FC<Props> = memo(({ userId, onSelectUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const selectedUser = users.find(user => user.id === userId);

  const loadUsers = useCallback(async () => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      setIsDropdownActive(false);
    }
  }, [userId]);

  const handleSelect = (id: number) => {
    if (userId === selectedUser?.id) {
      setIsDropdownActive(false);
    }

    onSelectUserId(id);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(state => !state)}
          onBlur={() => setIsDropdownActive(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              href={`#${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': userId === user.id },
              )}
              onClick={() => handleSelect(user.id)}
              onMouseDown={event => event.preventDefault()}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
