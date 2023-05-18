import classNames from 'classnames';
import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[] | null,
  onHandleUserSelect(userId: number, userName: string): void,
  onHandleSelectButton: () => void,
  isActiveList: boolean,
  userName: string,
};

export const UserSelector: React.FC<Props> = ({
  users,
  onHandleUserSelect,
  onHandleSelectButton,
  isActiveList,
  userName,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActiveList },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => onHandleSelectButton()}
        >
          <span>{`${userName}`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users && (
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className="dropdown-item"
                onClick={() => onHandleUserSelect(user.id, user.name)}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
