import React, {
  useState,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type Props = {
  setUserId: (userId: number) => void;
  userId: number;
  isDropdownOpened: boolean;
  onCloseDropdown: () => void;
  onToggle: () => void;
};

export const UserSelector: React.FC<Props> = memo(({
  setUserId,
  userId,
  isDropdownOpened,
  onCloseDropdown,
  onToggle,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersFromServer: User[] = await client.get('/users');

      setUsers(usersFromServer);
    };

    loadUsers();
  }, []);

  const handleSelect = useCallback((
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    selectedUserId: number,
  ) => {
    e.preventDefault();
    setUserId(selectedUserId);
    onCloseDropdown();
  }, [setUserId]);

  const chosenUser = useMemo(() => {
    return users.find(currentUser => currentUser.id === userId);
  }, [userId]);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => onToggle()}
        >
          <span>{!chosenUser ? 'Choose a user' : chosenUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {Boolean(isDropdownOpened) && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': user.id === userId },
                )}
                onClick={(e) => handleSelect(e, user.id)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
});
