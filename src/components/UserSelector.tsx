import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  loadUserPosts: (id: number) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  loadUserPosts,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const selectUser = (user: User) => {
    if (currentUser?.id === user.id) {
      setIsDropDownActive(false);

      return;
    }

    loadUserPosts(user.id);
    setCurrentUser(user);
    setIsDropDownActive(false);
  };

  function setDropDownList() {
    setIsDropDownActive(value => !value);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropDownActive })}
    >
      <div
        className="dropdown-trigger"
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={setDropDownList}
        >
          <span>{ currentUser ? currentUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
          onBlur={() => setIsDropDownActive(false)}
        >
          {users.map((user) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className="dropdown-item"
                onClick={() => selectUser(user)}
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
