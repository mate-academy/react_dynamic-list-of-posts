import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../../Store';

import { getPosts } from '../../api/posts';

import { User } from '../../types/User';
import { Error } from '../../types/Error';

export const UserSelector: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { users, selectedUser } = useContext(StateContext);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const isSelectedUser = useCallback((user: User) => (
    selectedUser?.id === user.id
  ), [selectedUser]);

  const handleLoadPostsError = useCallback(() => {
    dispatch({ type: 'setError', payload: Error.LoadPosts });
    setTimeout(() => {
      dispatch({ type: 'setError', payload: '' });
    }, 3000);
  }, [dispatch]);

  const toggleDropdown = useCallback(() => {
    setIsOpenDropdown(prevState => !prevState);
  }, []);

  const onUserSelection = useCallback(async (user: User) => {
    if (isSelectedUser(user)) {
      return;
    }

    dispatch({ type: 'setSelectedUser', payload: user });
    dispatch({ type: 'setSelectedPost', payload: null });
    dispatch({ type: 'setIsLoadingPosts', payload: true });

    try {
      const postsFromServer = await getPosts(user.id);

      dispatch({ type: 'setPosts', payload: postsFromServer });
    } catch (error) {
      handleLoadPostsError();
    } finally {
      dispatch({ type: 'setIsLoadingPosts', payload: false });
    }
  }, [isSelectedUser, dispatch, handleLoadPostsError]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpenDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
          onBlur={() => setIsOpenDropdown(false)}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul className="dropdown-content">
          {users.map(user => (
            <li key={user.id}>
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': isSelectedUser(user),
                })}
                onMouseDown={() => onUserSelection(user)}
              >
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
