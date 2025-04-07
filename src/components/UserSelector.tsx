import classNames from 'classnames';
import React from 'react';
import { useRef, useEffect } from 'react';

export const UserSelector: React.FC = ({
  users,
  activeDrop,
  setActiveDrop,
  selectedUserId,
  oneUserSelected,
}) => {
  const handleActiveMenu = () => {
    setActiveDrop(prev => !prev);
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActiveDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setActiveDrop]);

  return (
    <div
      data-cy="UserSelector"
      ref={ref}
      className={classNames('dropdown', { 'is-active': activeDrop })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleActiveMenu}
        >
          <span>
            {selectedUserId
              ? users.find(user => user.id === selectedUserId).name
              : 'Choose a user'}
          </span>

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
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={() => {
                oneUserSelected(user.id);
                setActiveDrop(false);
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
