import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | null;
  chosenUser: User | null;
  chooseUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  chosenUser,
  chooseUser,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
        >
          <span>{chosenUser ? chosenUser.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              href={`#${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === chosenUser?.id,
              })}
              onClick={() => {
                setIsActive(false);
                chooseUser(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
