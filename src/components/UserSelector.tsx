import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[]
  selectUser: User | undefined
  selectedUserId: number | undefined
  setSelectedUserId: (a: number) => void
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let text = '';
  const myUser = selectUser as User;

  if (myUser) {
    text = myUser.name;
  } else {
    text = 'Choose a user';
  }

  const handleChangeUser = (id: number) => {
    setSelectedUserId(id);
    setIsOpen(false);
  };

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
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{text}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  onClick={() => handleChangeUser(user.id)}
                  href={`#user-${user.id}`}
                  className={classNames('dropdown-item',
                    { 'is-active': user.id === selectedUserId })}
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
