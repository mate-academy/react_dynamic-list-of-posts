import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  onSelect: (userId: number) => void;
  setIsSelected: (isSelected: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({ onSelect, setIsSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null>(null);

  const selectUser = (
    event: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    event.preventDefault();

    if (chosenUser && chosenUser.id === userId) {
      return;
    }

    onSelect(userId);
    setIsSelected(true);
    setChosenUser(users.find(user => user.id === userId) || null);
    setIsOpen(false);
  };

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      onBlur={() => setTimeout(() => setIsOpen(false), 300)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!chosenUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{chosenUser.name}</span>
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
              href={`user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': chosenUser?.id === user.id,
              })}
              key={user.id}
              onClick={event => selectUser(event, user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
