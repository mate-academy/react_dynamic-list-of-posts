import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { Post } from '../types/Post';

type Props = {
  selectedUser: User | null;
  setOpenPostId: (id: number | null) => void;
  setIsLoading: (load: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  setErrorMessage: (error: string) => void;
  setPosts: (posts: Post[]) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setOpenPostId,
  setPosts,
  setIsLoading,
  setErrorMessage,
  setSelectedUser,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'));
  }, [setErrorMessage]);

  const handleSelect = async (user: User) => {
    setIsLoading(true);
    setErrorMessage('');
    setPosts([]);
    setOpenPostId(null);

    try {
      const { getPosts } = await import('../api/posts');
      const posts = await getPosts(user.id);

      setSelectedUser(user);
      setPosts(posts);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
      setOpenPostId(null);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isSelectorOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsSelectorOpen(!isSelectorOpen)}
          onBlur={() => setIsSelectorOpen(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onMouseDown={() => handleSelect(user)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
