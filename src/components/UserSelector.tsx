import { FC, useState } from 'react';
import classNames from 'classnames';
import { useUsersContext } from '../context/UsersContext';
import { usePostsContext } from '../context/PostsContext';

export const UserSelector: FC = () => {
  const { users, setActiveUserId, activeUserId } = useUsersContext();
  const { getUserPosts, setActivePost } = usePostsContext();
  const [isUsersVisible, setIsUsersVisible] = useState(false);

  const activeUser = users.find(user => user.id === activeUserId) || null;

  const handleClickOnUser = (id: number) => {
    setActiveUserId(id);
    getUserPosts(id);
    setActivePost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isUsersVisible,
      })}
    >
      <div
        className="dropdown-trigger"
        onClick={() => setIsUsersVisible(prev => !prev)}
        onBlur={() => setIsUsersVisible(false)}
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{activeUser ? `${activeUser.name}` : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': user.id === activeUserId,
              })}
              onMouseDown={() => handleClickOnUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
