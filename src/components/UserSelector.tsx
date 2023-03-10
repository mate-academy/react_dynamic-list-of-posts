import classNames from 'classnames';
import React, {
  useEffect, useMemo, useState, useContext,
} from 'react';
import { getUsersList } from '../api';
import { GlobalContext } from '../reducer';
import { Error } from '../types/Error';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [listUsers, setListUsers] = useState<User[] | []>([]);
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    getUsersList().then((request: User[] | Error) => {
      if ('error' in request) {
        dispatch({ type: 'error', error: { ...request, type: 'listUsers' } });
      } else {
        setListUsers(request);
      }
    });

    document.addEventListener('click', (event: any) => {
      if (
        event.target.parentNode.className !== 'button'
        && event.target.parentNode.className !== 'icon is-small'
        && event.target.parentNode.className !== 'dropdown-trigger'
      ) {
        dispatch({ type: 'active', show: false });
      }
    });
  }, []);

  const selectUser = (user: User) => {
    if (user !== state.selectedUser) {
      dispatch({ type: 'selectUser', user });
      dispatch({ type: 'postsUser', posts: [] });
      dispatch({ type: 'error', error: null });
      dispatch({ type: 'selectPost', post: null });
    }

    dispatch({ type: 'active', show: false });
  };

  const renderListUsers = useMemo(() => {
    return listUsers.map((user: User) => {
      return (
        <a
          href={`#user-${user.id}`}
          className={classNames('dropdown-item', {
            'is-active': state.selectedUser === user,
          })}
          key={user.id}
          onClick={() => selectUser(user)}
        >
          {user.name}
        </a>
      );
    });
  }, [listUsers, state.selectedUser]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': state.activeList,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => dispatch({ type: 'active', show: !state.activeList })}
        >
          <span>
            {state.selectedUser
              ? state.selectedUser.name
              : 'Choose a user'}

          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {renderListUsers}
        </div>
      </div>
    </div>
  );
};
