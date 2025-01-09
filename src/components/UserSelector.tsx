import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  userSelected: User | null;
  setUserSelected: (user: User) => void;
  setComments?: (comments: Comment[]) => void;
  setPosts?: (posts: Post[]) => void;
  setPostSelected?: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  userSelected,
  setUserSelected,
  setComments,
  setPosts,
  setPostSelected,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUserClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    event.preventDefault();
    setUserSelected(user);
    setIsButtonClicked(false);
    setComments?.([]);
    setPosts?.([]);
    setPostSelected?.(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsButtonClicked(false);
    }
  };

  useEffect(() => {
    if (isButtonClicked) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isButtonClicked]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isButtonClicked })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsButtonClicked(!isButtonClicked)}
        >
          <span>{userSelected ? userSelected.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length === 0 ? (
            <p className="dropdown-item">No users available</p>
          ) : (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === userSelected?.id,
                })}
                onClick={event => handleUserClick(event, user)}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
