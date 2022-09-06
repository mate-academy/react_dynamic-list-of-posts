import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

interface Props {
  getPosts: (userId: number) => void;
  onUserChange: (newValue: null) => void;
  setSelectedPostId: (newValue: null) => void;
  selectedUserId: number | null;
}

export const UserSelector: React.FC<Props> = ({
  getPosts,
  onUserChange,
  setSelectedPostId,
  selectedUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(usersFromServer => setUsers(usersFromServer));

    const handleClickOutside = (event : MouseEvent) => {
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
    const { id } = user;

    if (id !== selectedUserId) {
      onUserChange(id);
      getPosts(id);
      setSelectedPostId(null);
    }

    setIsOpen(false);
  }, [selectedUserId]);

  const selectedUserName = users.find(({ id }) => id === selectedUserId)?.name;

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
          <span>{selectedUserName || 'Choose a user'}</span>

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
