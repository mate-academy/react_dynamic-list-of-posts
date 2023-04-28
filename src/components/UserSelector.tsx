import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUserId: number | null,
  onUserSelection: (id: number) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onUserSelection,
}) => {
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

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const selectedUser = useMemo(() => (
    users.find(user => user.id === selectedUserId)
  ), [selectedUserId]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': isExpanded,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggle}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isExpanded && (
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': selectedUser?.id === user.id,
                  },
                )}
                onClick={() => {
                  onUserSelection(user.id);
                  setIsExpanded(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
