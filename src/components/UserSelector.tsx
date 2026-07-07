import { useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  activeUser: User | null;
  setActiveUser: (value: User | null) => void;
  setActivePost: (value: Post | null) => void;
};

export const UserSelector = ({
  users,
  activeUser,
  setActiveUser,
  setActivePost,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleMenu}
          onBlur={handleBlur}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(
            (user, index) =>
              user.name && (
                <a
                  key={user.id}
                  href={`#user-${index + 1}`}
                  className={cn('dropdown-item', {
                    'is-active': user.name === activeUser?.name,
                  })}
                  onMouseDown={() => {
                    setActiveUser(user);
                    setActivePost(null);
                  }}
                >
                  {user.name}
                </a>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
