import {
  FC, memo, useEffect, useMemo, useState,
} from 'react';
import { getAllUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  selectedUserId: number,
  onSelect: (id: number) => unknown
  onErrorCatch: (message: string) => unknown

};

export const UserSelector: FC<Props> = memo(({
  selectedUserId, onSelect, onErrorCatch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleSelect = (id: number) => {
    if (selectedUserId !== id) {
      onSelect(id);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    getAllUsers()
      .then(loadedUsers => {
        setUsers(loadedUsers);
      })
      .catch(() => {
        onErrorCatch("Can't load users");
      });
  }, []);

  const selectetUserName = useMemo(() => {
    return users
      .find(user => user.id === selectedUserId)?.name ?? 'Choose a user';
  }, [selectedUserId]);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectetUserName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(({ id, name }) => (
              <a
                key={id}
                href={`#user-${id}`}
                className="dropdown-item"
                onClick={() => handleSelect(id)}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
