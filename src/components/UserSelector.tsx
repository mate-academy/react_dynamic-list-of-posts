import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User | null;
  users: User[];
  chooseUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({
  user, users, chooseUser,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpening = async () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown',
        { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleOpening}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(userFromServer => {
            const { id, name } = userFromServer;

            return (
              <a
                href={`#user-${id}`}
                key={id}
                className={classNames('dropdown-item',
                  { 'is-active': selectedUserId === id })}
                onClick={() => {
                  chooseUser(userFromServer);
                  setSelectedUserId(id);
                  setIsOpen(false);
                }}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
