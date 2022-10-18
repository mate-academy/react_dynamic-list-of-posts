import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { getAllUsers } from '../api/Users';
import { Loader } from './Loader';

interface Props {
  setSelectedUser: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUser: number | null;
}

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  selectedUser,
}) => {
  const { data: users, isLoading, isError } = useQuery(['users'], getAllUsers);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserSelect = async (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setSelectedUser(Number(event.currentTarget.id));
    setIsDropdownOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(prevState => !prevState)}
        >
          <span>
            {selectedUser
              ? users?.find((user) => user.id === selectedUser)?.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isError && <div>Error</div>}
          {isLoading && <Loader />}
          {users && users.map((user) => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className="dropdown-item"
              id={user.id.toString()}
              onClick={handleUserSelect}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
