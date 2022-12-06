import classNames from 'classnames';
import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[] | undefined,
  selectedUser: User | undefined,
  setSelectedUser(user: User): void,
};

export const UserSelector: React.FC<Props> = ({
  users, selectedUser, setSelectedUser,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const userSelector = React.useRef<HTMLDivElement>(null);

  const handleOnBlur = (event: MouseEvent) => {
    if (userSelector.current
      && !userSelector.current.contains(event.target as HTMLElement)) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
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
        { 'is-active': isMenuOpen },
      )}
      ref={userSelector}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
          {users?.map((user) => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': user.id === selectedUser?.id },
                )}
                onClick={() => {
                  setSelectedUser(user);
                  setIsMenuOpen(!isMenuOpen);
                }}
                key={user.id}
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
