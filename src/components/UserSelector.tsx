import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import { User } from '../types/User';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const { users, isUserSelectOpen, user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { id } = user || { id: 0 };

  const handleOpenModal = () => {
    dispatch({ type: 'isUserSelectOpen' });
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch({ type: 'isUserSelectOpen', isUserSelectOpen: false });
    }, 150);
  };

  const handleChooseUser = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, user: User) => {
    event.preventDefault();

    dispatch({ type: 'chooseUser', user: user });
    dispatch({ type: 'isOpenPostBody', isOpenPostBody: false });
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isUserSelectOpen }
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenModal}
          onBlur={handleCloseModal}
        >
          <span>{user ? `${user.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isUserSelectOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': user.id === id }
                  )}
                  onClick={(e) => handleChooseUser(e, user)}
                >
                  {user.name}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};
