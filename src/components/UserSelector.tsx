import React, {
  useEffect,
  // useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../utils/serverHelper';

type Props = {
  setUserSelectedId: (id: number) => void,
  userSelectedId: number,
};

export const UserSelector: React.FC<Props> = ({
  setUserSelectedId,
  userSelectedId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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

  const handleSelectUser = (newUserId: number) => {
    setShowUsers(false);
    setUserSelectedId(newUserId);
  };

  const selectedUser = users.find(user => user.id === userSelectedId)?.name;

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
              userSelectedId !== 0
                ? selectedUser
                : 'Choose a user'
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className="dropdown-item"
              key={user.id}
              onClick={() => {
                handleSelectUser(user.id);
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
