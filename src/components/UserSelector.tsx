import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../utils/helper';

type Props = {
  handleSelectUser: (id: number) => void,
  selectedUserId: number,
};

export const UserSelector: React.FC<Props> = ({
  handleSelectUser,
  selectedUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadUsers = useCallback(async () => {
    try {
      const usersFromServer = await getUsers();

      return setUsers(usersFromServer);
    } catch {
      return setIsError(true);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLoadUsers = () => {
    if (showUsers) {
      setShowUsers(false);
    } else {
      setShowUsers(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current
        && !wrapperRef.current.contains(event.target as Node)) {
        setShowUsers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const handleChangeUser = (newUserId: number) => {
    setShowUsers(false);
    handleSelectUser(newUserId);
  };

  const selectedUserName = users.find(user => user.id === selectedUserId)?.name;

  if (isError) {
    return (
      <div className="notification is-danger">
        Something went wrong!
      </div>
    );
  }

  return (
    <div
      data-cy="UserSelector"
      ref={wrapperRef}
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >

      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleLoadUsers}
        >
          <span>
            {
              selectedUserId
                ? selectedUserName
                : 'Choose a user'
            }
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
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item',
                { 'is-active': selectedUserId === user.id })}
              key={user.id}
              onClick={() => {
                handleChangeUser(user.id);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
