import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';
import { getPosts } from '../api/api';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setPosts: (posts: Post[]) => void ;
  setIsLoading: (value: boolean) => void;
  setHasPostsError: (vlaue: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setPosts,
  setIsLoading,
  setHasPostsError,
  setSelectedPost,
}) => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown');

    const userSelector = event.target as Node;

    if (dropdown?.contains(userSelector)) {
      return;
    }

    setDropdownIsActive(false);
  });

  const handleDropdown = () => {
    setDropdownIsActive(prevState => !prevState);
  };

  const handlePostsLoad = (user: User) => {
    setIsLoading(true);
    setSelectedUser(user);
    handleDropdown();
    setHasPostsError(false);
    setSelectedPost(null);

    getPosts(user.id)
      .then(setPosts)
      .catch(() => setHasPostsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': dropdownIsActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={() => handlePostsLoad(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
