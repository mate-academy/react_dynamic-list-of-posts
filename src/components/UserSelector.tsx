import React, { useContext, useEffect, useRef } from 'react';
import { StateContext } from '../store/store';
import { DropDownMenu } from './DropDownMenu';
import { User } from '../types/User';
import classNames from 'classnames';
import { getPosts } from '../api/fetches';

export const UserSelector: React.FC = () => {
  const {
    users,
    isOpenListUser,
    setIsOpenListUser,
    selectedUser,
    setSelectedUser,
    setPosts,
    setIsLoading,
    setIsWarming,
    setIsLoadingFail,
    setCurrentPost,
  } = useContext(StateContext);

  const inputRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsOpenListUser(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const handleToggleList = () => {
    setIsOpenListUser(prev => !prev);
  };

  useEffect(() => {
    if (selectedUser?.id) {
      setIsLoading(true);

      setIsWarming(false);

      setPosts(null);

      setIsLoadingFail(false);

      getPosts(selectedUser?.id)
        .then(response => {
          setPosts(response);
          if (!response.length) {
            setIsWarming(true);
          }
        })
        .catch(() => {
          setIsLoadingFail(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [
    selectedUser?.id,
    setPosts,
    setIsLoading,
    setIsWarming,
    setIsLoadingFail,
  ]);

  const handleChoseUser = (choseUser: User) => {
    setSelectedUser(choseUser);
    setIsOpenListUser(false);
    setCurrentPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpenListUser })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleList}
          onBlur={() => setIsOpenListUser(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <DropDownMenu>
        {users.map(user => (
          <a
            href={`#user-${user.id}`}
            key={user.id}
            className={classNames('dropdown-item', {
              'is-active': user.id === selectedUser?.id,
            })}
            onMouseDown={() => handleChoseUser(user)}
          >
            {user.name}
          </a>
        ))}
      </DropDownMenu>
    </div>
  );
};
