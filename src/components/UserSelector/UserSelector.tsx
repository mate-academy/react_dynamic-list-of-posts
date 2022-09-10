import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setCurrentUser } from '../../redux/slices/userSlice';

import { TRootDispatch, TRootState } from '../../redux/store';

import './UserSelector.scss';

export const UserSelector: React.FC = () => {
  const {
    users,
    currentUser,
  } = useSelector((state: TRootState) => state.users);
  const [listVisible, setListVisible] = useState(false);

  const dispatch: TRootDispatch = useDispatch();

  useEffect(() => setListVisible(false), [currentUser]);

  return (
    <div className="block">
      <div
        data-cy="UserSelector"
        className={classNames(
          'dropdown',
          {
            'is-active': listVisible,
          },
        )}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setListVisible(!listVisible)}
          >
            {currentUser ? (
              <span>{currentUser.name}</span>
            ) : (
              <span>Choose a user</span>
            )}

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#${user.id}`}
                key={user.id}
                className="dropdown-item"
                onClick={event => {
                  event.preventDefault();

                  dispatch(setCurrentUser(user));
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
