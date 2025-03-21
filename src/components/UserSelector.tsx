import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  loadPosts: (id: number) => void;
  setUserSelected: (user: User) => void;
  userSelected: User | null;
  setSelectedPost: (value: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  loadPosts,
  setUserSelected,
  userSelected,
  setSelectedPost,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  function chooseUser(user: User) {
    setSelectedPost(null);
    setUserSelected(user);
    loadPosts(user.id);
    setDropdownActive(false);
  }

  useEffect(() => {
    const handleClickOutside = e => {
      if (!dropdownRef.current?.contains(e.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownActive })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <span>{userSelected ? userSelected.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              href="#user-1"
              className={classNames('dropdown-item', {
                'is-active': user.id === userSelected?.id,
              })}
              key={user.id}
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
