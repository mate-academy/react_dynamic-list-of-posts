import React from 'react';
import classNames from 'classnames';

import { User } from '../types/User';
import { CurrentUser } from '../types/CurrentUser';

interface Props {
  users: User[];
  currentUser: CurrentUser | null;
  selectRef?: React.LegacyRef<HTMLDivElement>;
  handleSelectButtonClick: () => void;
  isSelectClicked: boolean;
  handleOnUserClick: (name: string, id: number) => void;
}

export const UserSelector: React.FC<Props>
  = ({
    users,
    isSelectClicked,
    handleSelectButtonClick,
    selectRef,
    handleOnUserClick,
    currentUser,
  }) => {
    return (
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', { 'is-active': isSelectClicked })}
      >
        <div
          ref={selectRef}
          className="dropdown-trigger"
        >
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleSelectButtonClick}
          >
            {!currentUser ? (
              <span>Choose a user</span>
            ) : (
              <span>{currentUser.name}</span>
            )}

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({ id, name }: User) => (
              <a
                href={`#${id}`}
                className="dropdown-item"
                key={id}
                style={
                  { backgroundColor: currentUser?.id === id ? 'cyan' : '' }
                }
                onClick={() => handleOnUserClick(name, id)}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
