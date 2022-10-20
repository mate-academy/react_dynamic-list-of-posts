import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  onSelectUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        >
          <span>{selectedUser ? (selectedUser.name) : ('Choose a user')}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelectorOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user${user.id}`}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUser?.id === user.id,
                  })}
                  onClick={(event => {
                    event.preventDefault();
                    setIsSelectorOpen(false);
                    onSelectUser(user);
                  })}
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
