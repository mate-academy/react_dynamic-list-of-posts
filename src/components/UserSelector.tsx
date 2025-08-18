import React, { useEffect, useMemo, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onChange: (userId: number | null) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onChange,
  disabled = false,
  loading = false,
  error = null,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current = useMemo(
    () => users.find(u => u.id === selectedUserId) || null,
    [users, selectedUserId],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocClick);

    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [open]);

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={`dropdown ${open ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen(v => !v)}
          disabled={disabled}
        >
          <span>{current ? current.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i
              className={`fas fa-angle-${open ? 'up' : 'down'}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {loading && <div className="dropdown-item">Loading...</div>}

          {error && !loading && (
            <div className="dropdown-item has-text-danger">
              Failed to load users
            </div>
          )}

          {!loading &&
            !error &&
            users.map(user => (
              <a
                key={user.id}
                href="#"
                className={`dropdown-item ${
                  user.id === selectedUserId ? 'is-active' : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  onChange(user.id);
                  setOpen(false);
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
