import classnames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import { User } from '../../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    setSelectedUser,
    selectedUser,
    isDropdownActive,
    setIsDropdownActive,
    setSelectedPost,
  } = useContext(TodosContext);

  const handleUserLinkClick = (user: User) => {
    setSelectedUser(user);
    setIsDropdownActive(false);
    setSelectedPost(undefined);
  };

  const handleonBlur = () => {
    setTimeout(() => {
      setIsDropdownActive(false);
    }, 200);
  };

  return (
    <>
      <div
        data-cy="UserSelector"
        className={classnames('dropdown', {
          'is-active': isDropdownActive,
        })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onBlur={handleonBlur}
            onClick={() => setIsDropdownActive(!isDropdownActive)}
          >
            {selectedUser
              ? <span>{selectedUser.name}</span>
              : <span>Choose a user</span>}

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classnames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleUserLinkClick(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="block">
        {!selectedUser
       && (
         <p data-cy="NoSelectedUser">
           No user selected
         </p>
       )}
      </div>
    </>
  );
};
