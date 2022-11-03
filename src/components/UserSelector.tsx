import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext, ReducerActions, StateContext } from '../AppContext';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const UserSelector: React.FC = () => {
  const { users, isUsersLoaded, selectedUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [isListVisiable, setIsListVisiable] = useState(false);
  const btnText = selectedUser?.name || 'Choose a user';

  const getUsersFromServer = async () => {
    await client.get<User[]>('/users')
      .then(res => {
        dispatch({
          type: ReducerActions.setUsers,
          payload: res,
        });
      })
      .catch(() => dispatch({
        type: ReducerActions.setIsUsersLoaded,
        payload: false,
      }))
      .finally(() => dispatch({
        type: ReducerActions.setIsUsersLoaded,
        payload: true,
      }));
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown',
        { 'is-active': isUsersLoaded && isListVisiable })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListVisiable(!isListVisiable)}
          onBlur={() => setIsListVisiable(false)}
        >
          <span>{btnText}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isUsersLoaded && isListVisiable && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {isUsersLoaded && users && users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onMouseDown={(event: React.MouseEvent) => {
                  event.preventDefault();
                  dispatch({
                    type: ReducerActions.setSelectedUser,
                    payload: user,
                  });
                  setIsListVisiable(false);
                }}
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
