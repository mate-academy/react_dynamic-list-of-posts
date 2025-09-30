import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type Props = {
  users: User[];
  loadPosts: (id: number) => void;
  selectedUser: User | null;
  setSelectedUser: (value: User | null) => void;
  loading?: boolean;
  error?: string | null;
};

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, [ref, handler]);
}

export const UserSelector: React.FC<Props> = ({
  users,
  loadPosts,
  selectedUser,
  setSelectedUser,
  loading = false,
  error = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
    loadPosts(user.id);
  };

  const closeDropdown = useCallback(() => setIsOpen(false), [])
  useOnClickOutside(ref, closeDropdown);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {!loading &&
            !error &&
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser && user.id === selectedUser.id,
                })}
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string,
  email: PropTypes.string,
});

UserSelector.propTypes = {
  users: PropTypes.arrayOf(userShape).isRequired,
  loadPosts: PropTypes.func.isRequired,
  selectedUser: PropTypes.oneOfType([userShape, PropTypes.oneOf([null])]),
  setSelectedUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
