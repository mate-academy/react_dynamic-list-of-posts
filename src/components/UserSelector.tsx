import React from 'react';
import cn from 'classnames';
import { PostsContext } from '../context/PostsContext';
import { User } from '../types/User';

type Props = {
  onUserSelected: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ onUserSelected }) => {
  const {
    users,
    selectedUser,
    setSelectedUser,
  } = React.useContext(PostsContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
    onUserSelected(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(openStatus => !openStatus)}
        >

          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => handleUserSelect(user)}
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
