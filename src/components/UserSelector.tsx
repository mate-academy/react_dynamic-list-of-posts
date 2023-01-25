/* eslint-disable max-len */
/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  activeUser: User | null,
  pendingPosts: boolean,
  showUserPosts: (user: User) => void,
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  activeUser,
  pendingPosts,
  showUserPosts,
}) => {
  const [dropDownVisibility, setDropDownVisibility] = useState(false);

  const handleDropDown = () => {
    setDropDownVisibility(!dropDownVisibility);
  };

  useEffect(() => {
    if (pendingPosts) {
      setDropDownVisibility(false);
    }
  }, [pendingPosts]);

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
          onClick={handleDropDown}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {(dropDownVisibility) && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item',
                    {
                      'is-active': activeUser && activeUser.id === user.id,
                    },
                  )}
                  key={user.id}
                  onClick={() => showUserPosts(user)}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
