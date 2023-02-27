import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../utils/serverHelper';

type Props = {
  setUserSelectedId: (id: number) => void,
  userSelectedId: number,
  setIsVisiblePostDetails: (value: boolean) => void,
  setIsVisibleSideBar: (value: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  setUserSelectedId,
  userSelectedId,
  setIsVisiblePostDetails,
  setIsVisibleSideBar,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setIsError(true);
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
    setIsVisiblePostDetails(false);
    setIsVisibleSideBar(false);
  };

  const selectedUser = users.find(user => user.id === userSelectedId)?.name;

  if (isError) {
    return (
      <div
        className="notification is-danger"
      >
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
              // className="dropdown-item"
              className={classNames('dropdown-item',
                { 'is-active': userSelectedId === user.id })}
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
