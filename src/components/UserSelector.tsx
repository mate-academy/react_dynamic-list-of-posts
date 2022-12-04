import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserContext } from './UsersContext';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null;
  onChangeUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onChangeUser,
}) => {
  const users = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleDocumentClick = () => {
      setIsExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isExpanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isExpanded },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsExpanded(current => !current)}
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
              onClick={() => onChangeUser(user)}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
