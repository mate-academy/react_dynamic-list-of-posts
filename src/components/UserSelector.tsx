import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[];
  onChoose: (userId: number) => void;
  selectedUserId: number;
}

export const UserSelector: React.FC<Props> = ({
  users,
  onChoose,
  selectedUserId,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectorTitle, setSelectorTitle] = useState('Choose a user');

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
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          <span>
            {selectorTitle}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isClicked && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                onClick={() => {
                  onChoose(user.id);
                  setIsClicked(false);
                  setSelectorTitle(user.name);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
