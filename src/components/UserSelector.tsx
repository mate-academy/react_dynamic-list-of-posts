import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { useOutsideAlerter } from '../customHooks/useOutsideAlerter';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideAlerter(dropdownRef, () => setIsDropDown(false));

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDropDown(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropDown,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropDown}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>
              {selectedUser.name}
            </span>
          )}

          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
            />
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
        >
          {users
            .map(user => {
              return (
                <a
                  href={`#user-${user.id}`}
                  className={classNames('dropdown-item', {
                    'is-active': user.id === selectedUser?.id,
                  })}
                  onClick={() => handleUserSelect(user)}
                  key={user.id}

                >
                  {user.name}
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};
