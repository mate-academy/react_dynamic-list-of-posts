import React, { MouseEventHandler, useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface Props {
  selectUser: (user: User | null) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({ selectUser, selectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(data => setUsers(data));
  }, []);

  const findUser: MouseEventHandler<HTMLDivElement> = event => {
    const user = event.target as HTMLAnchorElement;

    if (user.href) {
      const selected = users.find(({ id }) => id === +user.href.split('-')[1]);

      if (selected) {
        selectUser(selected);
      }
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
          onBlur={() => setIsActive(false)}
        >
          <span>{selectedUser?.name || `Choose a user`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" onMouseDown={findUser}>
          {users.map(({ id, name }) => (
            <a
              href={`#user-${id}`}
              className={classNames('dropdown-item', {
                'is-active': id === selectedUser?.id,
              })}
              key={id}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
