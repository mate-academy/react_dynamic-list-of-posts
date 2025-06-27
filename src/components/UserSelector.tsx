import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { UserList } from './UserList';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  getPostsFromServer: (userId: number) => Promise<void>;
  selectedPerson: User | null;
  setSelectedPerson: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
  setIsFormVisible: (value: boolean) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  getPostsFromServer,
  selectedPerson,
  setSelectedPerson,
  setSelectedPost,
  setIsFormVisible,
}) => {
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsUserListVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleSelectedUser(user: User) {
    setSelectedPost(null);
    setSelectedPerson(user);
    setIsUserListVisible(false);
    getPostsFromServer(user.id);
    setIsFormVisible(false);
  }

  return (
    <div
      data-cy="UserSelector"
      ref={containerRef}
      className={cn('dropdown', { 'is-active': isUserListVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUserListVisible(prev => !prev)}
        >
          {selectedPerson ? (
            <span>{selectedPerson.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <UserList
        users={users}
        onSelectedUser={handleSelectedUser}
        isVisible={isUserListVisible}
        selectedPerson={selectedPerson}
      />
    </div>
  );
};
