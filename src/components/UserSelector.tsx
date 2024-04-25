import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from './store/store';
import cn from 'classnames';
import { getPosts } from '../Api/getItems';

export const UserSelector: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { users, activeUserId } = useContext(StateContext);
  const [isOpenedUser, setIsOpenedUser] = useState(false);

  const findUserFromId = () => {
    if (activeUserId) {
      return users.find(user => user.id === activeUserId)?.name;
    } else {
      return 'Choose a user';
    }
  };

  const handleChooseUser = (id: number) => {
    dispatch({ type: 'SET_ACTIVEUSERID', id: id });
    dispatch({ type: 'SET_VAITINGPOSTS', isUse: true });
    dispatch({ type: 'SET_ERRORPOST', isUse: false });
    setIsOpenedUser(false);
    dispatch({ type: 'SET_POSTS', posts: [] });
    dispatch({ type: 'SET_ACTIVEPOSTID', id: 0 });

    getPosts(id)
      .then(data => {
        dispatch({ type: 'SET_POSTS', posts: data });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERRORPOST', isUse: true });
      })
      .finally(() => {
        dispatch({ type: 'SET_VAITINGPOSTS', isUse: false });
      });
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpenedUser(!isOpenedUser)}
        >
          <span>{findUserFromId()}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpenedUser && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({ id, name }) => (
              <a
                key={id}
                href="#user-2"
                className={cn('dropdown-item', {
                  'is-active': activeUserId === id,
                })}
                onClick={() => handleChooseUser(id)}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
