import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { User } from '../types';

type Props = {
  users: User[]
  selectedUser: User | null
  setSelectedUser: (user: User) => void
  startLoading: () => void
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  startLoading,
}) => {
  const [isActive, setIsActive] = useState(false);
  const toggleDropdown = () => setIsActive(!isActive);

  const onSelect = (user: User) => () => {
    setSelectedUser(user);
    toggleDropdown();
    startLoading();
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{`${selectedUser?.name || 'Choose a user'}`}</span>

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
          {users.map(user => (
            <Link
              key={user.id}
              to={`/user-${user.id}`}
              onClick={onSelect(user)}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
