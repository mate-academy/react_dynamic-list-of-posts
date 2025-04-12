import React, { useEffect, useState, useRef } from 'react';
import { getUsers } from '../api';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type UserSelectorProps = {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  userId,
  setUserId,
  setSelectedPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async () => {
    try {
      const userData = await getUsers();

      setUsers(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleUserSelect = (id: number) => {
    setUserId(id);
    setIsActive(false);
    setSelectedPost(null);
  };

  const selectedUser = users.find(user => user.id === userId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === userId,
              })}
              onClick={e => {
                e.preventDefault();
                handleUserSelect(user.id);
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
