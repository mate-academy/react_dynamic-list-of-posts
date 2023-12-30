/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export type UserSelectorProps = {
  userId: number
  setUserId: (id: number) => void
};

export const UserSelector: React.FC<UserSelectorProps>
= ({ userId, setUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [expandedList, setExpandedList] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      const list = await client.get('/users');

      setUsers(list as User[]);
    };

    getUsers();
  }, []);

  const handleList = () => {
    setExpandedList((prev) => !prev);
  };

  const handleUserId = (id: number) => {
    setUserId(id);
    handleList();
  };

  const getUserName = () => {
    const name = [];

    const user = users.find((item) => item.id === userId);

    if (user) {
      name.push(user.name);
    } else {
      name.push('Choose a user');
    }

    return name;
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
          onClick={handleList}
        >
          <span>{getUserName()}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        {expandedList && (
          <ul className="dropdown-content">
            {users.map((item) => (
              <a
                href={`#user-${item.id}`}
                className={classNames('dropdown-item',
                  { 'is-active': item.id === userId })}
                onClick={() => handleUserId(item.id)}
              >
                {item.name}
              </a>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
};
