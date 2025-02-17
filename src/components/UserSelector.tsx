import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onSelect: (id: number) => void;
  selectedId: number | null;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelect,
  selectedId,
  active,
  setActive,
}) => {
  const selectedName = users.find(user => user.id === selectedId)?.name;

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': active,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={event => {
            event.stopPropagation();
            setActive(prev => !prev);
          }}
        >
          {selectedId ? (
            <span>{selectedName}</span>
          ) : (
            <span>Choose a user</span>
          )}

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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedId,
              })}
              onClick={() => onSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
