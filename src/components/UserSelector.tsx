import React, { useEffect } from 'react';
import { useAppContext } from './HooksContext';

import { CurError, CurLoading, getPostsById } from '../utils/servises';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const {
    allUsers,
    selectedUser,
    setPosts,
    setLoading,
    setErrorMessage,
    setSelectedUser,
    showMenu,
    setShowMenu,
  } = useAppContext();

  const handleSelectMenu = () => setShowMenu(prev => !prev);

  useEffect(() => {
    setLoading(CurLoading.Posts);

    if (selectedUser) {
      setPosts([]);
      getPostsById(selectedUser.id)
        .then(postsFromServer => setPosts(postsFromServer))
        .catch(() => setErrorMessage(CurError.LoadPosts))
        .finally(() => setLoading(CurLoading.Empty));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showMenu,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleSelectMenu}
          onBlur={() => setShowMenu(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={classNames('dropdown-menu', {
          'is-hidden': !showMenu,
        })}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {allUsers.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onMouseDown={ev => {
                  ev.preventDefault();
                  setShowMenu(false);
                  setSelectedUser(user);
                }}
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
