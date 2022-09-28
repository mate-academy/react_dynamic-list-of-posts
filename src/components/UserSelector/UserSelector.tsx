import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { Error } from '../../types/Error';

type Props = {
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
  onError: (error: Error | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUserId,
  onSelectUser,
  onError,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isDropdown, setIsDropdown] = useState(false);

  const userListDropdown = useRef<HTMLDivElement>(null);

  const handleOnBlur = (event: MouseEvent) => {
    if (userListDropdown.current
      && !userListDropdown.current.contains(event.target as HTMLElement)) {
      setIsDropdown(false);
    }
  };

  const handleSelectUser = (user: User) => {
    const { name, id } = user;

    setSelectedUser(name);
    onSelectUser(id);
    setIsDropdown(false);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => onError(Error.GET_USERS));
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  }, [isDropdown]);

  return (
    <div
      className="block"
    >
      <div
        data-cy="UserSelector"
        className={classNames(
          'dropdown',
          { 'is-active': isDropdown },
        )}
        ref={userListDropdown}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <span>
              {!selectedUserId
                ? 'Choose a user'
                : `${selectedUser}`}
            </span>

            <span className="icon is-small">
              <i
                className="fas fa-angle-down"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>

        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div
            className="dropdown-content"
          >
            {users.length > 0 && (
              users.map(user => (
                <a
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': user.id === selectedUserId },
                  )}
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
