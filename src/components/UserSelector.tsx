import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/api';

type Props = {
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ onSelectUser }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(result => {
      const results: User[] = result.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));

      setUsers(results);
    });
  }, []);

  function chooseUser(user: User) {
    setSelectedUser(user);
    setIsOpenDropDown(false);
    onSelectUser(user);
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpenDropDown(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpenDropDown })}
      onFocus={() => setIsOpenDropDown(true)}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onMouseDown={() => setIsOpenDropDown(prev => !prev)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => chooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
