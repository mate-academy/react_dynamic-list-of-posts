import { useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  selectedUser?: User | null;
  onUserSelect: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleSelect = (user: User) => {
    setIsDropdownShown(false);
    onUserSelect(user);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;

    if (!dropdownRef.current?.contains(relatedTarget)) {
      setIsDropdownShown(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownShown })}
      ref={dropdownRef}
      onBlur={handleBlur}
      onClick={() => setIsDropdownShown(!isDropdownShown)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
