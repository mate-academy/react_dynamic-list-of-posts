import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onSelect: (name: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onSelect }) => {
  // region States
  const [userSelect, setUserSelect] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);
  //endregion

  // region Event handlers
  const handleUserSelect = (user: User): void => {
    setUserSelect(user);
    setVisible(false);
    onSelect(user);
  };
  //endregion

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setVisible(prev => !prev)}
        >
          <span>{userSelect ? userSelect.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {visible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href="#user-1"
                  className={classNames('dropdown-item', {
                    'is-active': userSelect && user.name === userSelect.name,
                  })}
                  onClick={() => handleUserSelect(user)}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
