import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  usersList: User[];
  currentUser: number | null;
  onUserSelect: (id: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  usersList,
  currentUser,
  onUserSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedUser = usersList.find(user => user.id === currentUser);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
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
          {usersList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': currentUser === user.id,
              })}
              onClick={event => {
                event.preventDefault();
                onUserSelect(user.id);
                setIsOpen(false);
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
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  currentUser: PropTypes.number,
  onUserSelect: PropTypes.func.isRequired,
};
