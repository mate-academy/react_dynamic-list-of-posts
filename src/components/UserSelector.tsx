import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | undefined;
  select: number | null;
  setSelect: React.Dispatch<React.SetStateAction<number | null>>;
  showUsers: boolean;
  setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
  selectUser?: User | undefined;
};
export const UserSelector: React.FC<Props> = ({
  users,
  select,
  setSelect,
  showUsers,
  setShowUsers,
  selectUser,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          {select === null ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectUser?.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              href={`${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': select === user.id,
              })}
              key={user.id}
              onClick={event => {
                event.preventDefault();
                setSelect(user.id);
                setShowUsers(false);
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
