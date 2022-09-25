import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

type Props = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>,
  users: User[],
  selectedUserId: number,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
  selectedPost: Post | null,
};
export const UserSelector: React.FC<Props> = ({
  setIsStarted,
  users,
  selectedUserId,
  setSelectedUserId,
  selectedPost,
}) => {
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isUsersListOpen, setIsUsersListOpen] = useState(false);

  useEffect(() => {
    setIsUsersListOpen(false);
  }, [selectedPost]);

  const handleOnClick = (selectedUser: User) => {
    setSelectedUserId(selectedUser.id);
    setSelectedUserName(selectedUser.name);
    setIsStarted(true);
    setIsUsersListOpen(false);
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
          onClick={() => setIsUsersListOpen(true)}
        >
          <span>
            {selectedUserName ? `${selectedUserName}:` : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
              onClick={() => setIsUsersListOpen(true)}
            />
          </span>
        </button>
      </div>
      {isUsersListOpen
        && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map((user, id) => (
                <a
                  key={user.id}
                  id={`${user.id}`}
                  href={`#user-${id + 1}`}
                  className={classNames(
                    'dropdown-item',
                    {
                      'is-active': user.id === selectedUserId,
                    },
                  )}
                  onClick={() => handleOnClick(user)}
                >
                  {user.name}
                </a>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
