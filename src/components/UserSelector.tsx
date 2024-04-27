import React, { useContext, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { ContextUsers } from './UsersContext';

type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const {
    setUserSelected,
    setVisiblePost,
    userSelected,
    setOpenSidebar,
    setSelectedPost,
  } = useContext(ContextUsers);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlerDropdownMenu = (user: User) => {
    setOpenSidebar(null);
    setSelectedPost(null);
    setUserSelected(user);
    setActiveDropDown(false);
    setVisiblePost(false);
  };

  return (
    <div
      ref={containerRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': activeDropDown })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => setActiveDropDown(state => !state)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{userSelected ? userSelected.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                onMouseEnter={() => setActiveUser(user.id)}
                onClick={() => handlerDropdownMenu(user)}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': activeUser === user.id,
                })}
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
