import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import './UserSelector.scss';
import { User } from '../../types/User';
import { DispatchContext, StateContext } from '../../store/store';
import { getPosts } from '../../api/api';

type Props = {
  users: User[];
  setIsLoading: (v: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({ users, setIsLoading }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { selectedUser } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  function handleSelectUser(user: User) {
    dispatch({ type: 'selectUser', payload: user });
    setShowDropdown(false);
  }

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      dispatch({ type: 'setUserPosts', payload: [] });

      getPosts(selectedUser.id)
        .then(posts => {
          dispatch({ type: 'setUserPosts', payload: posts });
        })
        .catch(() => {
          dispatch({
            type: 'setError',
            payload: 'Can\'t get post for this user',
          });

          setTimeout(() => {
            dispatch({ type: 'setError', payload: '' });
          }, 3000);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser, dispatch, setIsLoading]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': showDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button dropdown-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowDropdown(!showDropdown)}
          onBlur={() => setShowDropdown(false)}
        >
          <span>{selectedUser?.name || 'Select user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#user-1"
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
          {/* <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a> */}
        </div>
      </div>
    </div>
  );
};
