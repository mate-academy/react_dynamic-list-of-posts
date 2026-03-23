import React, { useEffect } from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  chosenUser: User | null;
  users: User[];
  onUserChose: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  chosenUser,
  onUserChose,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const selectorRef = React.useRef<HTMLDivElement>(null);

  const handleUserChose = (user: User) => {
    onUserChose(user);
    setIsActive(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={selectorRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{chosenUser?.name || 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': user.id === chosenUser?.id,
              })}
              key={user.id}
              onClick={() => handleUserChose(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
