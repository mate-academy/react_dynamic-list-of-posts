import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from '../types/User';
import UserItem from './UserItem';

interface Props {
  users: User[],
  selectedUser: User | null,
  onSelect: (user: User) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  onSelect,
  selectedUser,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((event) => {
    if (!dropdown.current?.contains(event.target)) {
      setIsOpened(false);
    }
  }, [dropdown]);

  const userSelectionHandler = useCallback((user) => {
    onSelect(user);
    setIsOpened(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={dropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpened(prevState => !prevState)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpened && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                selectedUser={selectedUser}
                onUserSelect={() => userSelectionHandler(user)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
