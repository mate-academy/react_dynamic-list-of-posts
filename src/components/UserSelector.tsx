import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/api';
import { Post } from '../types/Post';

interface Props {
  selectedUserId: number;
  setSelectedUserId: (id: number) => void;
  setPost: (post: Post | null) => void,
}

export const UserSelector: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
  setPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers().then((user) => {
      setUsers(user);
    });
  }, []);

  const selectUser = (user: User) => {
    setPost(null);
    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
      setSelectedUserName(user.name);
    }

    setIsDropDownActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as HTMLElement)) {
      setIsDropDownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isDropDownActive && 'is-active'}`}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownActive(prevState => !prevState)}
        >
          <span>{selectedUserName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={`dropdown-item ${id === selectedUserId && 'is-active'}`}
                onClick={() => selectUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
