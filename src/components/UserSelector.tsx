import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsersAsync } from '../features/userSlice';
import { setAuthor } from '../features/authorSlice';
import { User } from '../types/User';
import { setSelectedPost } from '../features/selectedPostSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(store => store.author.author);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleChange = useCallback((author: User | null | undefined) => {
    dispatch(setAuthor(author));
    dispatch(setSelectedPost(null));
  }, []);

  const users = useAppSelector(store => store.users.users);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => handleChange(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
