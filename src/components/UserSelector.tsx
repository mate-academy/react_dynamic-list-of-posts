import { FC, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';
import { Post } from '../types/Post';

interface IProps {
  users: User[];
  setIsOpen: (open: boolean) => void;
  setSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
}

export const UserSelector: FC<IProps> = ({
  users,
  setIsOpen,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [nameUser, setNameUser] = useState<string>('Choose a user');

  const ref = useRef<HTMLDivElement | null>(null);

  const handleDropDownMenu = () => {
    setIsActive(!isActive);
  };

  const handleUser = (user: User) => {
    setNameUser(user.name);
    setUserId(user.id);
    setSelectedUser(user);

    setSelectedPost(null);
    setIsActive(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <div
      data-cy="UserSelector"
      ref={ref}
      className={cn('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropDownMenu}
        >
          <span>{nameUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              onClick={() => handleUser(user)}
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': userId === user.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
