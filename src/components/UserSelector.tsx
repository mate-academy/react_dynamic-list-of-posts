import React, { useContext, useState, useEffect } from 'react';
import { DispatchContext, StateContext } from '../Store';
import classNames from 'classnames';
import { loadPosts } from '../utils/requests';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownMenu = document.getElementById('dropdown-menu');

      if (dropdownMenu && !dropdownMenu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOnClick = (id: number) => {
    dispatch({ type: 'toggleSideBar', payload: false });
    dispatch({ type: 'setUser', id });
    loadPosts(dispatch, id);
    setIsOpen(false);
  };

  const handleOpenOnClick = () => setIsOpen(!isOpen);

  return (
    <div className="block">
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': isOpen,
        })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleOpenOnClick}
          >
            <span>{selectedUser?.name || 'Choose a user'}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-{user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleOnClick(user.id)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
