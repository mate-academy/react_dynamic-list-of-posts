import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  selectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  selectedUser,
  selectUser,
}) => {
  const [isListOpened, setIsListOpened] = useState(false);
  const selectionRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = useCallback((user: User) => {
    selectUser(user);
    setIsListOpened(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectionRef.current
        && !selectionRef.current.contains(event.target as ChildNode)
      ) {
        setIsListOpened(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isListOpened },
      )}
      ref={selectionRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListOpened(!isListOpened)}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser === user },
                )}
                onClick={() => handleSelectUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
});
