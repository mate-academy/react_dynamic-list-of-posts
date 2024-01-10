import React, { useCallback } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { UserList } from '../UserList';
import './UserSelector.scss';

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
  const handleBlur = useCallback(() => {
    setTimeout(() => setIsDropDownList(false), 210);
  }, [setIsDropDownList]);

  const dropdownClasses = classNames('dropdown', {
    'is-active': isDropDownList,
  });

  return (
    <div data-cy="UserSelector" className={dropdownClasses}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleListDropDown}
          onBlur={handleBlur}
        >
          <span>{`${selectedUser ? selectedUser.name : 'Choose a user'}`}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <UserList
        users={users}
        selectedUser={selectedUser}
        handleChoseUser={handleChoseUser}
      />
    </div>
  );
};
