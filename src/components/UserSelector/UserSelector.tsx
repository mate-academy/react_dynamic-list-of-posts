import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getPosts } from '../../utils/fetch_Posts';

type Props = {
  users: User[],
  setLoadingError: React.Dispatch<React.SetStateAction<string>>,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPostsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
};
export const UserSelector: React.FC<Props> = ({
  users,
  setLoadingError,
  setPosts,
  setSelectedPost,
  setIsStarted,
  setIsPostsLoaded,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUsersListOpen, setIsUsersListOpen] = useState(false);

  const handleOnClick = (user: User) => {
    setSelectedUser(user);
    setIsStarted(true);
    setIsUsersListOpen(false);
    setIsPostsLoaded(false);
    setSelectedPost(null);

    getPosts()
      .then(postsFromApi => {
        setPosts(postsFromApi.filter(post => post.userId === user.id));
        setIsPostsLoaded(true);
      })
      .catch(() => setLoadingError('Something went wrong!'));
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUsersListOpen(true)}
        >
          <span>
            {selectedUser ? `${selectedUser.name}:` : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
              onClick={() => setIsUsersListOpen(true)}
            />
          </span>
        </button>
      </div>
      {isUsersListOpen
        && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map((user, id) => (
                <a
                  key={user.id}
                  id={`${user.id}`}
                  href={`#user-${id + 1}`}
                  className={classNames(
                    'dropdown-item',
                    {
                      'is-active': user.id === selectedUser?.id,
                    },
                  )}
                  onClick={() => handleOnClick(user)}
                >
                  {user.name}
                </a>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
