import React, { useContext, useState } from 'react';
import { User } from '../../types/User';
import { UserItem } from './components/UserItem';
import { postsContext } from '../../context/Store';
import classNames from 'classnames';
type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { state } = useContext(postsContext);
  const { selectedUser } = state;
  const handleMouseLeave = () => {
    setShowDropDown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(`dropdown`, { 'is-active': showDropDown })}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowDropDown(!showDropDown)}
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
          {users.map(user => (
            <UserItem
              user={user}
              selectedUser={selectedUser}
              onSelect={setShowDropDown}
              key={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
