import React, { useContext, useEffect, useRef, useState } from 'react';
import { UsersContext } from '../store/UsersProvider';
import classNames from 'classnames';
import { UserContext } from '../store/UserProvider';
import { User } from '../types/User';
import { getPosts } from '../api';
import { PostsContext } from '../store/PostsProvider';
import { PostContext } from '../store/PostProvider';
import { CommentsContext } from '../store/CommentsProvider';

export const UserSelector: React.FC = () => {
  const { users } = useContext(UsersContext);
  const { user, setUser } = useContext(UserContext);
  const { setPosts, setPostsStatus } = useContext(PostsContext);
  const { setPost } = useContext(PostContext);
  const { setComments } = useContext(CommentsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const selectUser = async (currentUser: User) => {
    setPosts([]);
    setPost(null);
    setComments([]);
    setPostsStatus('loading');
    setIsOpen(false);
    setUser(currentUser);

    try {
      const response = await getPosts(currentUser.id);

      if (!response) {
        throw new Error('404');
      }

      setPosts(response);
      setPostsStatus('success');
    } catch {
      setPostsStatus('error');
    }
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (selectRef.current && selectRef.current.contains(e.target as Node)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousedown', close);

    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        ['is-active']: isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{user === null ? 'Choose a user' : user.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" ref={selectRef}>
          {users.map(item => {
            return (
              <a
                key={item.id}
                href={`#user-${item.id}`}
                className={classNames('dropdown-item', {
                  ['is-active']: user?.id === item.id,
                })}
                onClick={() => selectUser(item)}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
