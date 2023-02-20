import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  onSelectedUser: (user: User | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectedUser,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const selectionRef = useRef<HTMLButtonElement>(null);

  const toggleUsersList = (isOpen: boolean) => {
    setIsListOpen(isOpen);
  };

  const handleChooseUser = (user: User) => {
    onSelectedUser(user);
    toggleUsersList(false);
  };

  useEffect(() => {
    const handleClickOutside = (target: EventTarget | null) => {
      if (selectionRef.current
        && !selectionRef.current.contains(target as Node)) {
        setIsListOpen(false);
      }
    };

    document.addEventListener(
      'click',
      (event) => handleClickOutside(event.target),
    );

    return () => {
      document.removeEventListener(
        'click',
        (event) => handleClickOutside(event.target),
      );
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isListOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          ref={selectionRef}
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => toggleUsersList(!isListOpen)}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser === user,
              })}
              onClick={() => handleChooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
