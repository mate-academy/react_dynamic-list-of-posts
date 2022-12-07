import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { User } from '../types/User';
import { UserContext } from './UserContext';

type Props = {
  activeUser: User | null;
  setActiceUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  activeUser,
  setActiceUser,
}) => {
  const users = useContext(UserContext);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    const handlePageClick = () => {
      if (isOpenDropdown) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener('click', handlePageClick);

    return () => {
      document.removeEventListener('click', handlePageClick);
    };
  }, [isOpenDropdown]);

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
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          <span>{ activeUser?.name || 'Choose a user' }</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map(user => (
              <a
                key={user.id}
                href={`#user-#${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === activeUser?.id,
                })}
                onClick={() => setActiceUser(user)}
              >
                {user.name}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
};
