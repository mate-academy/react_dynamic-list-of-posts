import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import cn from 'classnames';
import { PostContext } from '../context/PostProvider';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useContext(UserContext);
  const { setSelectedPost } = useContext(PostContext);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (!showList) {
      return;
    }

    const handleDocumentClick = () => {
      setShowList(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showList]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': showList })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setShowList(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setSelectedPost(null);
                setShowList(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// add 'is-active' to active user link
