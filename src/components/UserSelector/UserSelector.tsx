import React, { useState } from 'react';
import classNames from 'classnames';

import { useAppContext } from '../../BLoC/App/AppContext';

import { User } from '../../types';
import { Future } from '../Future';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, selectUser } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  function handleSelectUser(user: User) {
    setIsOpen(false);
    selectUser(user);
  }

  function handleDropdownToggle() {
    setIsOpen(prevState => !prevState);
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      data-cy="UserSelector"
      className={classNames('dropdown', { ' is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownToggle}
        >
          <span>{selectedUser ? `${selectedUser.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        onMouseDown={event => event.preventDefault()}
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          <Future
            future={users}
            whileReady={value => (
              <>
                {value.map(user => {
                  const isSelected = user.id === selectedUser?.id;

                  return (
                    <a
                      key={user.id}
                      href={`#user-${user.id}`}
                      className={classNames('dropdown-item', {
                        'is-active': isSelected,
                      })}
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.name}
                    </a>
                  );
                })}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
