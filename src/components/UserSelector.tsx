import React from 'react';
import cn from 'classnames';

import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from './GlobalStateProvider';

import * as userService from '../api/users';
import * as postService from '../api/posts';
import { User } from '../types/User';

type Props = {
  setLoading: (value: boolean) => void;
};
export const UserSelector: React.FC<Props> = ({ setLoading }) => {
  const [isActive, setIsActive] = React.useState(false);

  const { users, selectedUser } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  React.useEffect(() => {
    userService
      .getUsers()
      // eslint-disable-next-line
      .then(users =>
        dispatch({
          type: 'SET_USERS',
          payload: users,
        }),
      )
      .catch(() =>
        dispatch({
          type: 'SET_ERROR',
          payload: 'Something went wrong',
        }),
      );
  }, []);

  const handleSetSelectUser = (user: User) => {
    dispatch({
      type: 'SET_SELECTED_USER',
      payload: user,
    });

    setIsActive(false);
    setLoading(true);
    postService
      .getPosts(user.id)
      .then(posts => {
        dispatch({
          type: 'SET_USER_POSTS',
          payload: posts,
        });
      })
      .catch(() =>
        dispatch({
          type: 'SET_ERROR',
          payload: 'Something went wrong',
        }),
      )
      .finally(() => setLoading(false));
  };

  const handleIsActive = () => {
    setTimeout(() => {
      setIsActive(!isActive);
    }, 100);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleIsActive}
          onBlur={handleIsActive}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {users.map(user => {
            const { id, name } = user;

            return (
              <div className="dropdown-content" key={id}>
                <a
                  href={`#user-${id}`}
                  onClick={() => handleSetSelectUser(user)}
                  className={cn('dropdown-item', {
                    'is-active': id === selectedUser?.id,
                  })}
                >
                  {name}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
