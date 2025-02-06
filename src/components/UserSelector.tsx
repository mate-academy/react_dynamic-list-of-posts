import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface Props {
  onUserSelect: (id: number) => void;
}

export const UserSelector: React.FC<Props> = ({ onUserSelect }) => {
  const [users, setUser] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.get<User[]>('/users');

        setUser(response);
      } catch {}
    };

    fetchUser();
  }, []);

  const toodleDropDown = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserSelect = (id: number, name: string) => {
    setSelectedUserName(name);
    onUserSelect(id);
    setIsOpen(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toodleDropDown}
        >
          <span>{selectedUserName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': selectedUserName,
                })}
                onClick={() => handleUserSelect(user.id, user.name)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
