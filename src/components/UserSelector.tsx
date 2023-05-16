import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  user: User | null,
  setUser: (user: User) => void,
  users: User[],
  setIsPostsLoading: (isLoading: boolean)=> void,
};

export const UserSelector: React.FC<Props> = ({
  user, setUser, users, setIsPostsLoading,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const onUserChoose = (item: User) => {
    setIsPostsLoading(true);
    setUser(item);
    setIsDropDown(false);
  };

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
          onClick={() => setIsDropDown(prev => !prev)}
        >
          <span>
            {user?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((item) => (
              <a
                key={item.id}
                href={`#user-${item.id}`}
                className="dropdown-item"
                onClick={() => onUserChoose(item)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
