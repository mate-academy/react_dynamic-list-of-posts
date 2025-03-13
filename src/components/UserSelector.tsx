import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onClickSelect: (value: User | null) => void;
  loadUserPost: (value: number) => Promise<void>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onClickSelect,
  loadUserPost,
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleClickSelect = (user: User) => {
    loadUserPost(user.id);
    onClickSelect(user);
    setIsDropDownOpen(false);
  };

  const handleClickDropDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropDownOpen(prev => !prev);
  };

  const handleOutsideClick = () => {
    setIsDropDownOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropDownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickDropDown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => handleClickSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
