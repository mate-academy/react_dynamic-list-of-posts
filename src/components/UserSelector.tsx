import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  users: User[];
  onUserSelect: (userId: number | null) => void;
  selectedUserId?: number | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
  selectedUserId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      {' '}
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
          data-cy="UserSelectorButton"
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
              key={user.id}
              href="#"
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={event => {
                event.preventDefault();
                onUserSelect(user.id);
                setIsOpen(false);
              }}
              data-cy={`UserSelectorItem-${user.id}`}
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
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onUserSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};
