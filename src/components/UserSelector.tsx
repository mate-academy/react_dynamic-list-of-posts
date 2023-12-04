import React, { useContext, useState } from 'react';
// import cn from 'classnames';
import { User } from '../types/User';
import { AppContext } from '../AppContext';

interface Props {
  onUserSelect: (user: User) => void,
}

export const UserSelector: React.FC<Props> = ({ onUserSelect }) => {
  const {
    users,
    selectedUser,
    setSelectedUser,
  } = useContext(AppContext);

  const [isVisibleUserList, setIsVisibleUserList] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsVisibleUserList(false);
    onUserSelect(user);
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
          onClick={() => setIsVisibleUserList(!isVisibleUserList)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisibleUserList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </a>
            ))}
            {/* <a href="#user-1" className="dropdown-item">Leanne Graham</a>
          <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a>
          <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
          <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
          <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
          </div>
        </div>
      )}
    </div>
  );
};
