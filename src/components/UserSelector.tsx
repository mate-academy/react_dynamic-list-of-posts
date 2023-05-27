import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  handleSelectUser: (value: User) => void;
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  selectedUser,
  handleSelectUser,
}) => {
  const [list, setList] = useState(false);

  const toggleList = useCallback(() => {
    setList(prev => !prev);
  }, []);

  const handleListClick = useCallback((user: User) => {
    handleSelectUser(user);
    toggleList();
  }, [users]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': list })}
    >

      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleList}
        >
          {selectedUser ? selectedUser.name : (<span>Choose a user</span>)}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item',
                {
                  'is-active': selectedUser?.id === user.id,
                })}
              onClick={() => handleListClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
