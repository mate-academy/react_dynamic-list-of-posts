import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { SelectedUserContext } from '../providers/UserProvider';
import { SelectedPostContext } from '../providers/PostProvider';

export const UserSelector: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { setSelectedPost } = useContext(SelectedPostContext);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleUserSelection = useCallback(
    (user: User) => {
      setSelectedUser(user);
      setSelectedPost(null);
      setIsVisible(false);
    },
    [setSelectedUser, setSelectedPost, setIsVisible],
  );

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isVisible,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsVisible(!isVisible)}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 ? (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleUserSelection(user)}
              >
                {user.name}
              </a>
            ))
          ) : (
            <div className="dropdown-item has-background-danger has-text-light">
              Something went wrong! Refresh the page or try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
