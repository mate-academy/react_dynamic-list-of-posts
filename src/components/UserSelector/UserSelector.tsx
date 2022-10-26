import classnames from 'classnames';
import React, { useState } from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  onUserSelect: (user: User) => void,
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const openDropDownHandler = () => {
    if (!dropDownOpen) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
    }
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
          onClick={openDropDownHandler}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {dropDownOpen && users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={
                  classnames(
                    'dropdown-item',
                    { 'is-active': user.id === selectedUser?.id },
                  )
                }
                onClick={() => {
                  openDropDownHandler();
                  onUserSelect(user);
                }}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
});
