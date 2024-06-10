import React, { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../utils/httpClient';
import { UserContext } from '../context/UserContextProvider';
import { UserLoaderContext } from '../context/UserLoaderContextProvider';
import { PostContext } from '../context/PostContextProvider';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const { setLoading } = useContext(UserLoaderContext);
  const { setPost } = useContext(PostContext);

  const menubarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getUsers().then(us => {
      setUsers(us);
    });
  }, []);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const link = e.nativeEvent.relatedTarget as HTMLLinkElement;

    if ((!link || !link.classList.contains('dropdown-item')) && isOpen) {
      setIsOpen(!isOpen);
    }
  };

  const setCurrentUser = (us: User) => {
    if (menubarRef.current) {
      menubarRef.current.focus();
    }

    if ((user && user.id !== us.id) || !user) {
      setLoading(true);
      setPost(null);
    }

    setUser(us);
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      onBlur={handleOnBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenMenu}
          ref={menubarRef}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((us, index) => {
            return (
              <a
                href={`#user-${index + 1}`}
                key={us.id}
                className={classNames('dropdown-item', {
                  'is-active': user && us.id === user.id,
                })}
                onClick={() => setCurrentUser(us)}
              >
                {us.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
