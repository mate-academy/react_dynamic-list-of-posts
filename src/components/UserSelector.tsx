import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  userId: number,
  setUserId: (arg: number) => void,
};

export const UserSelector: React.FC<Props> = ({ users, userId, setUserId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedUser = users?.find(item => item.id === userId);

  return (
    <>

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
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {userId
                ? selectedUser?.name
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
                onClick={() => {
                  setUserId(user.id);
                  setIsOpen(false);
                }}
                className={classNames('dropdown-item', {
                  'is-active': userId === user.id,
                })}
              >
                {user.name}
              </a>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};
