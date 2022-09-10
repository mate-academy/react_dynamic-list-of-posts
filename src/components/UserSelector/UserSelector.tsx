import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setCurrentUser } from '../../redux/slices/userSlice';
import { setCurrentPost } from '../../redux/slices/postSlice';

import { TRootDispatch, TRootState } from '../../redux/store';

import './UserSelector.scss';

export const UserSelector: React.FC = () => {
  const {
    users,
    currentUser,
  } = useSelector((state: TRootState) => state.users);
  const [listVisible, setListVisible] = useState(false);

  const dropdownTrigger = useRef<HTMLDivElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  const dispatch: TRootDispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!dropdown.current || !dropdownTrigger.current) {
        return;
      }

      if (dropdown.current.contains(event.target as Node)) {
        return;
      }

      if (dropdownTrigger.current.contains(event.target as Node)) {
        return;
      }

      setListVisible(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [listVisible]);

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
        <div
          className="dropdown-trigger"
          ref={dropdownTrigger}
        >
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

        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          ref={dropdown}
        >
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#${user.id}`}
                key={user.id}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': user.id === currentUser?.id,
                  },
                )}
                onClick={event => {
                  event.preventDefault();

                  setListVisible(false);
                  dispatch(setCurrentUser(user));
                  dispatch(setCurrentPost(null));
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
