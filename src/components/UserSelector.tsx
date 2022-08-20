import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

interface Props {
  getPosts: (userId: number) => void
  onUserChange: (newValue: null) => void;
}

export const UserSelector: React.FC<Props> = ({ getPosts, onUserChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(usersFromServer => setUsers(usersFromServer));

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current
        && !wrapperRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(prevValue => !prevValue);
  }, []);

  const handleSelect = useCallback((user) => {
    if (user !== selectedUser) {
      setSelectedUser(user);
      getPosts(user.id);
      onUserChange(null);
    }

    setIsOpen(false);
  }, [selectedUser]);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={wrapperRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpen}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                key={user.id}
                onClick={() => handleSelect(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
