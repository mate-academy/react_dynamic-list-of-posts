import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  setUserSelected: (user: User) => void;
  userSelected: User | null;
  handleUserPosts: (user: User) => void;
  setShowSideBar: (item: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setUserSelected,
  userSelected,
  handleUserPosts,
  setShowSideBar,
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(event.target as Node)
      ) {
        setShowUsers(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showUsers })}
    >
      <div className="dropdown-trigger" ref={dropdownTriggerRef}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUsers(prev => !prev)}
        >
          {userSelected ? (
            <span>{userSelected.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropdownMenuRef}
      >
        <div
          className="dropdown-content"
          style={{ display: showUsers ? 'block' : 'none' }}
        >
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === userSelected?.id,
              })}
              key={user.id}
              onClick={() => {
                setUserSelected(user);
                setShowUsers(false);
                handleUserPosts(user);
                setShowSideBar(null);
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
