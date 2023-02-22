import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/loadData';
import { User } from '../../types/User';
import { getUserById } from '../../utils/helper';

type Props = {
  onSelectUser: (userIda: number) => void;
  selectedUserId: number;
};

export const UserSelector: React.FC<Props> = ({
  onSelectUser,
  selectedUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const selectedUser = getUserById(users, selectedUserId);

  const handleDropMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  if (isError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropMenu}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {users.length > 0 && (
            <div className="dropdown-content">
              {users.map((user: User) => (
                <a
                  key={user.name}
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': selectedUserId === user.id },
                  )}
                  onClick={() => {
                    onSelectUser(user.id);
                    setIsOpen(false);
                  }}
                >
                  {user.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
