import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import classNames from 'classnames';

type UserSelectorProps = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector = ({
  selectedUser,
  setSelectedUser,
}: UserSelectorProps) => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [openList, setOpenList] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(setUsersList)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally();
  }, []);

  const handleUserSelected = (user: User) => {
    setSelectedUser(user);
    setOpenList(false);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setOpenList(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openList })}
      onBlur={event => handleBlur(event)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpenList(!openList)}
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => handleUserSelected(user)}
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
