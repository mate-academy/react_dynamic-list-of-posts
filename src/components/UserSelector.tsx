import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import classNames from 'classnames';

type UserSelectorProps = {
  fetchPosts: (userId: number) => void
}

export const UserSelector: React.FC<UserSelectorProps> = ({ fetchPosts }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSelectorActive, setIsSelectorActive] = useState(false);

  const fetchUsers = () => {
    client
      .get<User[]>('/users')
      .then(users => setUsers(users))
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => fetchUsers(), []);

  const toggleSelector = () =>
    setIsSelectorActive(prevActiveSelector => !prevActiveSelector);

  const onSelect = (userId: number) => {
    setIsSelectorActive(false);
    fetchPosts(userId)
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isSelectorActive,
      })}
    >
      <div className="dropdown-trigger" onClick={toggleSelector}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user: User, i) => (
            <a
              href={`#user-${i}`}
              className="dropdown-item"
              onClick={() => onSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
