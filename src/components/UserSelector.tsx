import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { User } from '../types/User';
import classNames from 'classnames';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelected: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleUserClick = (user: User) => {
    onSelected(user);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
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

UserSelector.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired as PropTypes.Validator<User[]>,
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }) as PropTypes.Validator<User | null>,
  onSelected: PropTypes.func.isRequired,
};
