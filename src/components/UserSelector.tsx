import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../api/users';
import { NotificationMassege } from '../types/NotificationMassege';
import { User } from '../types/User';

type Props = {
  selectedUserId: number;
  setSelectedUserId: (id: number) => void;
  onError: (massege: NotificationMassege) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUserId, setSelectedUserId, onError,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [openList, setOpenList] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => onError(NotificationMassege.GET_USERS));
  }, []);

  const handleOnBlur = (event: MouseEvent) => {
    if (dropdown.current
      && !dropdown.current.contains(event.target as HTMLElement)) {
      setOpenList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOnBlur);

    return () => {
      document.removeEventListener('click', handleOnBlur);
    };
  }, [openList]);

  const selectUser = (user: User) => {
    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
      setSelectedUserName(user.name);
    }

    setOpenList(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': openList },
      )}
      ref={dropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpenList(current => !current)}
        >
          <span>{selectedUserName || 'Choose a user'}</span>

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
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUserId },
              )}
              onClick={() => selectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
