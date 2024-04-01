import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  posts: Post[];
  addPosts: (posts: Post[]) => void;
  addLoading: (value: boolean) => void;
  hasError: boolean;
  addHasError: (value: boolean) => void;
  selectedUser: User | null;
  addSelectedUser: (user: User | null) => void;
  selectedPost: Post | null;
  addSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  posts,
  addPosts,
  addLoading,
  hasError,
  addHasError,
  selectedUser,
  addSelectedUser,
  selectedPost,
  addSelectedPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersVisible, setIsUsersVisible] = useState<boolean>(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => addHasError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnBlurDropdownButton = (): void => {
    setTimeout(() => {
      setIsUsersVisible(false);
    }, 300);
  };

  const handleOnClickUser = (user: User): void => {
    if (hasError) {
      addHasError(false);
    }

    if (posts.length) {
      addPosts([]);
    }

    if (selectedPost) {
      addSelectedPost(null);
    }

    addLoading(true);
    setIsUsersVisible(false);
    addSelectedUser(user);

    client
      .get<Post[]>(`/posts?userId=${user.id}`)
      .then(addPosts)
      .catch(() => addHasError(true))
      .finally(() => addLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isUsersVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUsersVisible(!isUsersVisible)}
          onBlur={handleOnBlurDropdownButton}
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
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': id === selectedUser?.id,
                })}
                onClick={() => handleOnClickUser(user)}
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
