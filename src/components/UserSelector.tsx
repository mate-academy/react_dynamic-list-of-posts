import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  setSelectedUserId: (id: number) => void,
  selectedUserId: number,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [isMenuDropped, setIsMenuDropped] = useState(false);
  const dropDownElement = useRef<HTMLDivElement | null>(null);

  const selectUser = (user: User) => {
    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
    }
  };

  const handleOnBlur = (event: MouseEvent) => {
    if (!dropDownElement?.current?.contains(event.target as HTMLElement)) {
      setIsMenuDropped(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  });

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isMenuDropped },
      )}
    >
      <div
        className="dropdown-trigger"
        ref={dropDownElement}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuDropped(prev => !prev)}
        >

          <span>Choose a user</span>

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
          {users.map((user) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                onClick={() => selectUser(user)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
