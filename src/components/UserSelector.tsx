import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';

const dropdownClass = (value: boolean) => cn(
  'dropdown',
  { 'is-active': value === true },
);

type Props = {
  selectedUser: null | User,
  handleSelectedUser: (value: User) => void,
  handlePost: (value: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser, handleSelectedUser, handlePost,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [users, setUsers] = useState<null | User[]>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await client.get<User[]>('\\users');

        setUsers(data);
      } catch (error) {
        throw new Error('user loading failed');
      }
    }

    fetchUsers();
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={dropdownClass(dropdown)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(!dropdown)}
        >
          <span>
            {selectedUser !== null
              ? selectedUser.name : 'Choose a user'}

          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users && users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => {
                handleSelectedUser(user);
                setDropdown(false);
                handlePost(null);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
