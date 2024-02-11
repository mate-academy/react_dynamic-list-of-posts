import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { GlobalContext } from '../AppContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    allUsers,
    setSelectedUser,
    selectedUser,
    setIsLoading,
  } = useContext(GlobalContext);

  const [isActive, setIsActive] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  function selectorHandle() {
    setIsActive(!isActive);
  }

  const handleDocumentClick = (e: MouseEvent) => {
    if (selectorRef.current
      && !selectorRef.current.contains(e.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setIsActive(false);
    }

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [selectedUser]);

  function pickUser(user: User) {
    if (user.name === selectedUser?.name) {
      setIsActive(false);

      return;
    }

    setIsLoading(true);
    setSelectedUser(user);
  }

  return (
    <div
      ref={selectorRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={selectorHandle}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser?.name
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers.map((user, i) => (
            <a
              key={user.id}
              href={`#user-${i}`}
              className={classNames('dropdown-item',
                { 'is-active': user.name === selectedUser?.name })}
              onClick={() => pickUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
