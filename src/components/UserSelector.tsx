import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  onChooseUser: (userId:number) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  onChooseUser,
}) => {
  const [isClickedOnMenu, setIsClickedOnMenu] = useState(false);
  const [title, setTitle] = useState('Choose a user');
  const [selectedUser, setSelectedUser] = useState(-1);

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
          onClick={() => setIsClickedOnMenu(prevState => !prevState)}
        >
          <span>{title}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isClickedOnMenu && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item', { 'is-active': user.id === selectedUser },
                  )}
                  onClick={() => {
                    onChooseUser(user.id);
                    setSelectedUser(user.id);
                    setIsClickedOnMenu(false);
                    setTitle(user.name);
                  }}
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
