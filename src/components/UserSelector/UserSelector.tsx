import React, { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import { User } from '../../types';
import './UserSelector.css';

interface Props {
  users: User[];
  selectedUser: User | null;
  onChangeSelectedUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onChangeSelectedUser,
}) => {
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeSelectedUser = (user: User) => {
    setIsActiveDropDown(prev => !prev);
    onChangeSelectedUser(user);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setIsActiveDropDown(false);
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();
    changeSelectedUser(user);
    setIsActiveDropDown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActiveDropDown })}
    >
      <div
        className="dropdown-trigger"
        ref={dropdownRef}
        tabIndex={0}
        onBlur={handleBlur}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropDown(!isActiveDropDown)}
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
              key={uuidv4()}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={event => handleMouseDown(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
