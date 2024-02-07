import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  getUserId: (userId: number) => void,
};

export const UserSelector: React.FC<Props> = ({ users, getUserId }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveItem, setIsActiveItem] = useState({
    id: 0,
    name: 'Choose a user',
  });

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
          onClick={() => setIsActiveMenu(!isActiveMenu)}
        >
          <span>{isActiveItem.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isActiveMenu && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === isActiveItem.id,
                })}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();

                  getUserId(user.id);

                  setIsActiveMenu(!isActiveMenu);

                  setIsActiveItem({
                    id: user.id,
                    name: user.name,
                  });
                }}
                key={user.id}
              >
                {user.name}
              </a>
            ))}

            <a href="#user-2" className="dropdown-item is-active">
              Ervin Howell
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
