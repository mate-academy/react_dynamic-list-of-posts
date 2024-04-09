import cn from 'classnames';
import React, { useState } from 'react';
import { useGlobalContext } from '../lib/GlobalContext';
import type { User } from '../types/User';
import * as servicesPosts from '../api/posts';

export const UserSelector: React.FC = () => {
  const {
    setIsSideBarOpen,
    users,
    selectUser,
    setSelectUser,
    setPosts,
    setHasErrorMessage,
    setIsPostLoading,
    setSelectPost,
  } = useGlobalContext();
  const [isDropdown, setIsDropdown] = useState(false);

  const handleSelectUser = async (user: User) => {
    setSelectUser(user);
    setIsDropdown(false);
    setHasErrorMessage(false);
    setIsSideBarOpen(false);
    setSelectPost(null);

    try {
      setIsPostLoading(true);
      const data = await servicesPosts.getPosts(user.id);

      setPosts(data);
    } catch (error) {
      setHasErrorMessage(true);
    } finally {
      setIsPostLoading(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdown(!isDropdown)}
          onBlur={() => setIsDropdown(false)}
        >
          <span>{selectUser ? selectUser.name : 'Choose a user'}</span>

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
              className={cn('dropdown-item', {
                'is-active': selectUser?.id === user.id,
              })}
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
