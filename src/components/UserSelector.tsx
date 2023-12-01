import React from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  handleListDropDown: () => void;
  selectedUser: User | null;
  isDropDownList: boolean;
  setIsDropDownList: (value: boolean) => void;
  users: User[];
  handleChoseUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  handleListDropDown,
  selectedUser,
  isDropDownList,
  setIsDropDownList,
  users,
  handleChoseUser,
}) => {
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
          onClick={handleListDropDown}
          onBlur={() => setTimeout(() => setIsDropDownList(false), 210)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDownList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div
            className="dropdown-content"
          >
            {users.map(el => (
              <a
                href="#user-2"
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === el.id,
                })}
                onClick={() => handleChoseUser(el)}
              >
                {el.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
