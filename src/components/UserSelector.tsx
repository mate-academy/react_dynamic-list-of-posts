import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[] | null,
  selectedUserId: number,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>,
};

export const UserSelector: React.FC<Props> = ({
  selectedUserId,
  users,
  setSelectedUserId,
  setSelectedPostId,
}) => {
  const [isShown, setIsShown] = useState(false);

  const toggleDropDown = useCallback(
    () => setIsShown(current => !current), [isShown],
  );

  const handleClick = (event: React.MouseEvent, userId: number) => {
    event.preventDefault();
    setSelectedUserId(userId);
    setSelectedPostId(0);
    setIsShown(false);
  };

  const selectedUser = useMemo(
    () => users?.find((user) => user.id === selectedUserId), [selectedUserId],
  );

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
          onClick={toggleDropDown}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isShown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users && users.map((user) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                onClick={(event) => {
                  handleClick(event, user.id);
                }}
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
