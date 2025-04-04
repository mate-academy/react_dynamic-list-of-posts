import { useEffect, useState, useRef } from 'react';
import { User } from '../../types';
import { client } from '../../utils/fetchClient';
import './UserSelector.scss';

interface Props {
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
}

export const UserSelector: React.FC<Props> = ({ onSelect, selectedUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError('');

      try {
        const loadedUsers = await client.get<User[]>('/users');

        setUsers(loadedUsers);
      } catch (e) {
        setError('Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>
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
              className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
              onClick={() => {
                onSelect(user.id);
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>

      {isLoading && <div className="loader">Loading users...</div>}
      {error && <div className="notification is-danger">{error}</div>}
    </div>
  );
};
