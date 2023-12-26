import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    getUserPosts,
    setUserPosts,
    setError,
    setIsLoading,
  } = useContext(AppContext);
  const [isDropdown, setIsDropdown] = useState(false);

  const handlerDropdownVisible = () => {
    setIsDropdown((previousState: boolean) => !previousState);
  };

  const handlerSelectedUserChange = (user: User) => {
    setError(false);
    setIsLoading(true);
    setSelectedUser(user);

    getUserPosts(user.id)
      .then((userPosts: Post[]) => {
        setUserPosts(userPosts);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handlerDropdownVisible}
          onBlur={handlerDropdownVisible}
        >

          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {!!users && users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className="dropdown-item"
                onMouseDown={() => handlerSelectedUserChange(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
