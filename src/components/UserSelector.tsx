import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getPostsByUser } from '../utils/api';

interface Props {
  users: User[];
  selectedUser: User | null;

  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPostsLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setPosts,
  setIsLoading,
  setPostsLoadingError,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const userPick = (user: User) => {
    setSelectedUser(user);
    setIsActive(false);
    setIsLoading(true);
    setPosts(null);

    getPostsByUser(user.id)
      .then((postsFromAPI) => {
        setPosts(postsFromAPI);
      })
      .catch(() => setPostsLoadingError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${cn({ 'is-active': isActive })}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
        <div className="dropdown-content">
          {users.map((singleUser) => (
            <a
              href={`#user-${singleUser.id}`}
              key={singleUser.id}
              className={`dropdown-item ${cn({
                'is-active': singleUser.id === selectedUser?.id,
              })}`}
              onClick={() => userPick(singleUser)}
            >
              {singleUser.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
