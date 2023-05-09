import React from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[];
  currentUserName: string | null;
  currentUserId: number | null;
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
    currentUserName,
    currentUserId,
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
            {!currentUserName ? (
              <span>Choose a user</span>
            ) : (
              <span>{currentUserName}</span>
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
                className={
                  classNames('dropdown-item',
                    { 'is-active': currentUserId === id })
                }
                key={id}
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
