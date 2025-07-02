import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { getPostsByUserId } from '../service/getPost';
import { Post } from '../types/Post';

type UserSelectorProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setUserPosts: (posts: Post[] | null) => void;
  setShowPostInfo: (val: boolean) => void;
  setUserIsLoading: (val: boolean) => void;
  setUsersError: (val: boolean) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  setUserPosts,
  setUsersError,
  setShowPostInfo,
  setUserIsLoading,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuIsOpen(false);
      }
    };

    if (menuIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuIsOpen]);

  const handleUserSelect = async (user: User) => {
    try {
      setUserPosts(null);
      setUserIsLoading(true);
      const thisUserPosts = await getPostsByUserId(user.id);

      setSelectedUser(user);
      setUserPosts(thisUserPosts);
    } catch {
      setUsersError(true);
    } finally {
      setUserIsLoading(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': menuIsOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
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
              onClick={e => {
                e.preventDefault();
                setMenuIsOpen(false);
                setShowPostInfo(false);
                handleUserSelect(user);
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
