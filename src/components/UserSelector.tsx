import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

type Props = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  selectedUserId: number | null;
  onSelect: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  isLoading,
  error,
  selectedUserId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: globalThis.MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocClick);

    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const currentTitle = isLoading
    ? 'Loading users...'
    : selectedUserId
      ? (users.find(u => u.id === selectedUserId)?.name ?? 'Choose a user')
      : 'Choose a user';

  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      ref={rootRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          ref={triggerRef}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          aria-expanded={isOpen}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(o => !o);
          }}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              triggerRef.current?.blur();
            }
          }}
        >
          <span>{currentTitle}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading && <div className="dropdown-item">Loading users…</div>}
          {error && (
            <a
              href="#"
              className="dropdown-item has-text-danger"
              // eslint-disable-next-line max-len
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                e.preventDefault()
              }
            >
              {error}
            </a>
          )}

          {!isLoading &&
            !error &&
            users.map(user => (
              <a
                key={user.id}
                href="#"
                className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(user.id);
                  setIsOpen(false);
                  triggerRef.current?.blur();
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

UserSelector.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  selectedUserId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
} as unknown as React.WeakValidationMap<unknown>;
