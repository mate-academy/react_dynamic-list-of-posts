import React from 'react';
import { PostContext } from './PostContext';

export const UserSelector: React.FC = () => {
  const { users, user, setUser } = React.useContext(PostContext)!;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={`dropdown-menu ${isOpen ? 'is-active' : ''}`}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(u => (
            <a
              key={u.id}
              href={`#user-${u.id}`}
              className={`dropdown-item ${u.id === user?.id ? 'is-active' : ''}`}
              onClick={() => {
                setIsOpen(false);
                setUser(u);
              }}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
