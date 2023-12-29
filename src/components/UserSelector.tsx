import React from 'react';
import { User } from '../types/User';
import { UserList } from './UserList';

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
    <div data-cy="UserSelector" className="dropdown is-active">
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

      {isDropDownList
      && (
        <UserList
          users={users}
          selectedUser={selectedUser}
          handleChoseUser={handleChoseUser}
        />
      )}
    </div>
  );
};
