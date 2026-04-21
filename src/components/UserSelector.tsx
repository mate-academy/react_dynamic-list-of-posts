import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  dropDownRef: React.RefObject<HTMLDivElement>;
  users: User[];
  selectedUser: User | null;
  isOpen: boolean;
  handleSelectedUser: (user: User) => void;
  handleIsOpen: (isOpen: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  dropDownRef,
  users,
  selectedUser,
  isOpen,
  handleIsOpen,
  handleSelectedUser,
}) => {
  return (
    <div
      ref={dropDownRef}
      data-cy="UserSelector"
      className={classNames(`dropdown ${isOpen ? 'is-active' : ''}`)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => handleIsOpen(!isOpen)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i
              className={`fas ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`}
              aria-hidden="true"
            />
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
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
