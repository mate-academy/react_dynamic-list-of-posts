import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  onSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({ onSelect, selectedUser }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);

    return () => setUsers(null);
  }, []);

  const handleUserSelect = (user: User) => {
    onSelect(user);
    setShowList(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showList,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowList(true);
          }}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {showList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.map(user => {
              const { id, name } = user;

              return (
                <a
                  href={`#user-${id}`}
                  key={id}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUser?.id === id,
                  })}
                  onClick={() => handleUserSelect(user)}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
