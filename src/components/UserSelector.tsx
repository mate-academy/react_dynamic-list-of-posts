import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { User } from '../types/User';
import { useClickOutside } from '../hooks/useClickOutside';

type Props = {
  users: User[];
  chosenUserId: number | null;
  toChooseUserId: (id: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  chosenUserId,
  toChooseUserId,
  users,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clickRef = useRef(null);

  useClickOutside(clickRef, () => setIsDropdownOpen(false));

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
      ref={clickRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setIsDropdownOpen(prev => !prev);
          }}
        >
          {chosenUserId ? (
            <span>{users.find(user => user.id === chosenUserId)?.name}</span>
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
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': chosenUserId === user.id,
              })}
              key={user.id}
              onClick={() => {
                toChooseUserId(user.id);
                setIsDropdownOpen(false);
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
  chosenUserId: PropTypes.number,
  toChooseUserId: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired
}